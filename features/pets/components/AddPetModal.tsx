import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { PET_TYPES, type PetTypeId } from "@/features/pets/constants/petTypes";

interface AddPetModalProps {
  visible: boolean;
  petName: string;
  petBrief: string;
  selectedType: PetTypeId | null;
  onChangePetName: (name: string) => void;
  onChangePetBrief: (brief: string) => void;
  onSelectType: (type: PetTypeId) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export function AddPetModal({
  visible,
  petName,
  petBrief,
  selectedType,
  onChangePetName,
  onChangePetBrief,
  onSelectType,
  onClose,
  onConfirm,
}: AddPetModalProps) {
  const isConfirmDisabled =
    !selectedType || petName.trim() === "" || petBrief.trim() === "";

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add a New Pet</Text>

          <TextInput
            style={styles.input}
            placeholder="Pet name"
            placeholderTextColor="#999"
            value={petName}
            onChangeText={onChangePetName}
            autoFocus
          />

          <TextInput
            style={[styles.input, styles.briefInput]}
            placeholder="Brief for vet (allergies, meds, behavior)"
            placeholderTextColor="#999"
            value={petBrief}
            onChangeText={onChangePetBrief}
            multiline
            numberOfLines={3}
            maxLength={160}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>{petBrief.length}/160</Text>

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
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#222",
    marginBottom: 18,
  },
  briefInput: {
    minHeight: 88,
    marginBottom: 6,
  },
  characterCount: {
    fontSize: 12,
    color: "#777",
    marginBottom: 14,
    textAlign: "right",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  typeChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: "transparent",
  },
  typeChipSelected: {
    borderColor: "#4e6ef2",
    backgroundColor: "#eef1ff",
  },
  typeChipEmoji: {
    fontSize: 20,
    marginRight: 6,
  },
  typeChipLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  typeChipLabelSelected: {
    color: "#4e6ef2",
    fontWeight: "700",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#f1f3f6",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },
  confirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#4e6ef2",
  },
  confirmButtonDisabled: {
    opacity: 0.4,
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});