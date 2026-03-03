import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
    Alert,
    Linking,
    Pressable,
    ScrollView,
    Text,
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

  const [checkedSymptoms, setCheckedSymptoms] = useState<Record<string, boolean>>(
    {}
  );

  const displayName = params.name ?? "Unknown pet";
  const displayEmoji = params.emoji ?? "🐾";
  const displayBrief = params.brief ?? "";
  const displayAge = params.age?.trim() ? `${params.age} years old` : "Age not set";
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

  const openDialPad = async () => {
    const normalizedNumber = displayEmergencyVetPhone
      .replace(/[^0-9+]/g, "")
      .trim();
    const dialUrl = normalizedNumber ? `tel:${normalizedNumber}` : "tel:";
    const canOpenDialPad = await Linking.canOpenURL(dialUrl);

    if (!canOpenDialPad) {
      Alert.alert("Cannot open phone app", "Try calling your emergency vet directly.");
      return;
    }

    await Linking.openURL(dialUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
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
          <Text style={styles.sectionTitle}>Pictures</Text>
          {detailContent?.pictureUrls.map((url, index) => (
            <Image
              key={`${displayName}-${index}`}
              source={url}
              contentFit="cover"
              style={styles.picture}
            />
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Emergency vet</Text>
          <Pressable style={styles.emergencyButton} onPress={openDialPad}>
            <Text style={styles.emergencyButtonText}>Call emergency vet</Text>
          </Pressable>
          {displayEmergencyVetPhone ? (
            <Text style={styles.emergencyHint}>Number: {displayEmergencyVetPhone}</Text>
          ) : null}
          <Text style={styles.emergencyHint}>
            This opens your dial pad so you can quickly call your local clinic.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}