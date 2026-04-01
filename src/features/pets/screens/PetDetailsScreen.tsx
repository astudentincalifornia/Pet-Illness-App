import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PET_DETAIL_CONTENT } from "@/features/pets/constants/petDetailContent";
import {
  getPetTypeById,
  type PetTypeId,
} from "@/features/pets/constants/petTypes";
import { styles } from "@/features/pets/screens/PetDetailsScreen.styles";

export function PetDetailsScreen() {
  const params = useLocalSearchParams<{
    petId?: string;
    name?: string;
    type?: string;
    emoji?: string;
    brief?: string;
    age?: string;
    emergencyVetPhone?: string;
  }>();

  const petType = (params.type ?? "") as PetTypeId;
  const petTypeInfo = getPetTypeById(petType);
  const detailContent = petTypeInfo ? PET_DETAIL_CONTENT[petType] : undefined;

  const [checkedSymptoms, setCheckedSymptoms] = useState<
    Record<string, boolean>
  >({});
  const [symptomTagInput, setSymptomTagInput] = useState("");
  const [symptomTags, setSymptomTags] = useState<string[]>([]);

  const displayName = params.name ?? "Unknown pet";
  const displayEmoji = params.emoji ?? "🐾";
  const displayBrief = params.brief ?? "";
  const displayAge = params.age?.trim()
    ? `${params.age} years old`
    : "Age not set";
  const displayType = petTypeInfo?.label ?? "Unknown type";
  const displayEmergencyVetPhone = params.emergencyVetPhone ?? "";

  const symptoms = useMemo(() => {
    if (!detailContent) {
      return [];
    }

    return detailContent.commonSymptoms;
  }, [detailContent]);

  const toggleSymptom = (symptom: string) => {
    setCheckedSymptoms((current) => ({
      ...current,
      [symptom]: !current[symptom],
    }));
  };

  const addSymptomTag = () => {
    const normalizedInput = symptomTagInput.trim();

    if (!normalizedInput) {
      return;
    }

    setSymptomTags((current) => {
      const exists = current.some(
        (tag) => tag.toLowerCase() === normalizedInput.toLowerCase(),
      );

      if (exists) {
        return current;
      }

      return [...current, normalizedInput];
    });
    setSymptomTagInput("");
  };

  const removeSymptomTag = (tagToRemove: string) => {
    setSymptomTags((current) => current.filter((tag) => tag !== tagToRemove));
  };

  const openDialPad = async () => {
    const normalizedNumber = displayEmergencyVetPhone
      .replace(/[^0-9+]/g, "")
      .trim();
    const dialUrl = normalizedNumber ? `tel:${normalizedNumber}` : "tel:";
    const canOpenDialPad = await Linking.canOpenURL(dialUrl);

    if (!canOpenDialPad) {
      Alert.alert(
        "Cannot open phone app",
        "Try calling your emergency vet directly.",
      );
      return;
    }

    await Linking.openURL(dialUrl);
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        contentInsetAdjustmentBehavior="never"
      >
        <View style={styles.heroCard}>
          <Text style={styles.petEmoji}>{displayEmoji}</Text>
          <Text style={styles.petName}>{displayName}</Text>
          <Text style={styles.petMeta}>
            {displayType} • {displayAge}
          </Text>
          <Text style={styles.petBrief}>{displayBrief}</Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Common symptoms</Text>
          {symptoms.map((symptom) => (
            <Pressable
              key={symptom}
              style={styles.symptomRow}
              onPress={() => toggleSymptom(symptom)}
            >
              <View
                style={[
                  styles.checkbox,
                  checkedSymptoms[symptom] ? styles.checkboxChecked : undefined,
                ]}
              >
                {checkedSymptoms[symptom] ? (
                  <Text style={styles.checkMark}>✓</Text>
                ) : null}
              </View>
              <Text style={styles.symptomLabel}>{symptom}</Text>
            </Pressable>
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Images</Text>
          <Pressable
            style={styles.uploadPlaceholderBox}
            onPress={() =>
              Alert.alert(
                "Upload image",
                "Image upload flow can be connected here.",
              )
            }
          >
            <Text style={styles.uploadPlaceholderText}>Upload image</Text>
          </Pressable>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Current symptom tags</Text>
          <View style={styles.symptomTagInputRow}>
            <TextInput
              value={symptomTagInput}
              onChangeText={setSymptomTagInput}
              placeholder="Add symptom tag"
              placeholderTextColor="#7e8696"
              style={styles.symptomTagInput}
              onSubmitEditing={addSymptomTag}
              returnKeyType="done"
            />
            <Pressable style={styles.addTagButton} onPress={addSymptomTag}>
              <Text style={styles.addTagButtonText}>Add</Text>
            </Pressable>
          </View>
          <View style={styles.symptomTagList}>
            {symptomTags.map((tag) => (
              <Pressable
                key={tag}
                style={styles.symptomTagChip}
                onPress={() => removeSymptomTag(tag)}
              >
                <Text style={styles.symptomTagChipText}>{tag} ×</Text>
              </Pressable>
            ))}
          </View>
          <Pressable style={styles.diagnoseButton}>
            <Text style={styles.diagnoseButtonText}>Diagnose illness</Text>
          </Pressable>
        </View>

        <View style={styles.footerSpacer} />
      </ScrollView>

      <View style={styles.stickyEmergencyFooter}>
        <Text style={styles.sectionTitle}>Emergency vet</Text>
        <Pressable style={styles.emergencyButton} onPress={openDialPad}>
          <Text style={styles.emergencyButtonText}>Call emergency vet</Text>
        </Pressable>
        {displayEmergencyVetPhone ? (
          <Text style={styles.emergencyHint}>
            Number: {displayEmergencyVetPhone}
          </Text>
        ) : null}
        <Text style={styles.emergencyHint}>
          This opens your dial pad so you can quickly call your local clinic.
        </Text>
      </View>
    </SafeAreaView>
  );
}
