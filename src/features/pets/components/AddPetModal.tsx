import { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { styles } from "@/features/pets/components/AddPetModal.styles";
import { PET_TYPES, type PetTypeId } from "@/features/pets/constants/petTypes";

interface AddPetModalProps {
  visible: boolean;
  petName: string;
  petAge: string;
  petBrief: string;
  emergencyVetPhone: string;
  selectedType: PetTypeId | null;
  onChangePetName: (name: string) => void;
  onChangePetAge: (age: string) => void;
  onChangePetBrief: (brief: string) => void;
  onChangeEmergencyVetPhone: (phone: string) => void;
  onSelectType: (type: PetTypeId) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export function AddPetModal({
  visible,
  petName,
  petAge,
  petBrief,
  emergencyVetPhone,
  selectedType,
  onChangePetName,
  onChangePetAge,
  onChangePetBrief,
  onChangeEmergencyVetPhone,
  onSelectType,
  onClose,
  onConfirm,
}: AddPetModalProps) {
  const { height: windowHeight } = useWindowDimensions();
  const isConfirmDisabled =
    !selectedType ||
    petName.trim() === "" ||
    petAge.trim() === "" ||
    petBrief.trim() === "" ||
    emergencyVetPhone.trim() === "";

  const parsedAge = Number.parseInt(petAge, 10);
  const ageValue = Number.isNaN(parsedAge) ? 0 : parsedAge;
  const isAgeEmpty = petAge.trim() === "";

  const handleAgeChange = (value: string) => {
    const numericOnly = value.replace(/[^0-9]/g, "");
    onChangePetAge(numericOnly);
  };

  const handleEmergencyPhoneChange = (value: string) => {
    const numericOnly = value.replace(/[^0-9+]/g, "");
    onChangeEmergencyVetPhone(numericOnly);
  };

  const incrementAge = () => {
    const nextAge = Math.min(99, ageValue + 1);
    onChangePetAge(String(nextAge));
  };

  const decrementAge = () => {
    if (isAgeEmpty) {
      return;
    }

    const nextAge = Math.max(0, ageValue - 1);
    onChangePetAge(String(nextAge));
  };

  const collapsedHeight = Math.min(windowHeight * 0.58, 520);
  const expandedHeight = Math.min(windowHeight * 0.94, windowHeight - 28);
  const collapsedTranslateY = expandedHeight - collapsedHeight;

  const translateY = useRef(new Animated.Value(collapsedTranslateY)).current;
  const dragStartOffsetRef = useRef(collapsedTranslateY);
  const currentOffsetRef = useRef(collapsedTranslateY);

  useEffect(() => {
    const listenerId = translateY.addListener(({ value }) => {
      currentOffsetRef.current = value;
    });

    return () => {
      translateY.removeListener(listenerId);
    };
  }, [translateY]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    translateY.setValue(collapsedTranslateY);
    currentOffsetRef.current = collapsedTranslateY;
    dragStartOffsetRef.current = collapsedTranslateY;
  }, [collapsedTranslateY, translateY, visible]);

  const panResponder = useMemo(() => {
    const snapTo = (target: number) => {
      Animated.spring(translateY, {
        toValue: target,
        useNativeDriver: true,
        damping: 22,
        stiffness: 140,
        mass: 0.8,
        overshootClamping: true,
      }).start();
    };

    const getClosestSnapPoint = (value: number) => {
      const midpoint = collapsedTranslateY / 2;
      return value < midpoint ? 0 : collapsedTranslateY;
    };

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,
      onPanResponderGrant: () => {
        translateY.stopAnimation((value) => {
          dragStartOffsetRef.current = value;
          currentOffsetRef.current = value;
        });
      },
      onPanResponderMove: (_, gesture) => {
        const nextValue = dragStartOffsetRef.current + gesture.dy;
        const clampedValue = Math.max(
          0,
          Math.min(collapsedTranslateY, nextValue)
        );
        currentOffsetRef.current = clampedValue;
        translateY.setValue(clampedValue);
      },
      onPanResponderRelease: (_, gesture) => {
        const projectedValue = currentOffsetRef.current + gesture.vy * 140;
        const clampedProjection = Math.max(
          0,
          Math.min(collapsedTranslateY, projectedValue)
        );
        snapTo(getClosestSnapPoint(clampedProjection));
      },
      onPanResponderTerminate: () => {
        snapTo(getClosestSnapPoint(currentOffsetRef.current));
      },
    });
  }, [collapsedTranslateY, translateY]);

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Animated.View
          style={[
            styles.modalContent,
            { height: expandedHeight, transform: [{ translateY }] },
          ]}
        >
          <View style={styles.handleArea} {...panResponder.panHandlers}>
            <View style={styles.handle} />
          </View>

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>Add a New Pet</Text>

            <TextInput
              style={styles.input}
              placeholder="What's your your pet's name?"
              placeholderTextColor="#999"
              value={petName}
              onChangeText={onChangePetName}
              autoFocus={true}
            />

            <View style={styles.ageInputRow}>
              <TextInput
                style={[styles.input, styles.ageInput]}
                placeholder="How old is your pet?"
                placeholderTextColor="#999"
                value={petAge}
                onChangeText={handleAgeChange}
                keyboardType="number-pad"
                inputMode="numeric"
                returnKeyType="done"
                maxLength={2}
              />

              <View style={styles.ageStepper}>
                <Pressable style={styles.ageStepButton} onPress={incrementAge}>
                  <Text style={styles.ageStepButtonText}>▲</Text>
                </Pressable>
                <Pressable
                  style={[styles.ageStepButton, styles.ageStepButtonBottom]}
                  onPress={decrementAge}
                >
                  <Text style={styles.ageStepButtonText}>▼</Text>
                </Pressable>
              </View>
            </View>

            <TextInput
              style={[styles.input, styles.briefInput]}
              placeholder="Brief description of your pet (e.g. personality, habits, etc.)"
              placeholderTextColor="#999"
              value={petBrief}
              onChangeText={onChangePetBrief}
              multiline
              numberOfLines={3}
              maxLength={160}
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>{petBrief.length}/160</Text>

            <TextInput
              style={styles.input}
              placeholder="Emergency vet phone number"
              placeholderTextColor="#999"
              value={emergencyVetPhone}
              onChangeText={handleEmergencyPhoneChange}
              keyboardType="phone-pad"
              inputMode="tel"
              returnKeyType="done"
            />

            <Text style={styles.sectionLabel}>Choose a type</Text>
            <View style={styles.typeGrid}>
              {PET_TYPES.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <Pressable
                    key={type.id}
                    style={[styles.typeChip, isSelected && styles.typeChipSelected]}
                    onPress={() => onSelectType(type.id)}
                  >
                    <Text style={styles.typeChipEmoji}>{type.emoji}</Text>
                    <Text
                      style={[
                        styles.typeChipLabel,
                        isSelected && styles.typeChipLabelSelected,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.modalActions}>
              <Pressable style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.confirmButton,
                  isConfirmDisabled && styles.confirmButtonDisabled,
                ]}
                onPress={onConfirm}
                disabled={isConfirmDisabled}
              >
                <Text style={styles.confirmButtonText}>Add Pet</Text>
              </Pressable>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
