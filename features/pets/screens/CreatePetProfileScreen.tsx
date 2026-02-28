import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddPetModal } from "@/features/pets/components/AddPetModal";
import { PetCard } from "@/features/pets/components/PetCard";
import {
    getPetTypeById,
    type PetTypeId,
} from "@/features/pets/constants/petTypes";
import type { Pet } from "@/features/pets/types/pet";

export function CreatePetProfileScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<PetTypeId | null>(null);
  const [petName, setPetName] = useState("");
  const [petBrief, setPetBrief] = useState("");

  const isEmpty = pets.length === 0;

  const sortedPets = useMemo(() => {
    return [...pets].sort((firstPet, secondPet) => {
      return firstPet.name.localeCompare(secondPet.name);
    });
  }, [pets]);

  const openModal = () => {
    setSelectedType(null);
    setPetName("");
    setPetBrief("");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmAddPet = () => {
    if (!selectedType || petName.trim() === "" || petBrief.trim() === "") {
      return;
    }

    const typeInfo = getPetTypeById(selectedType);
    if (!typeInfo) {
      return;
    }

    const newPet: Pet = {
      id: `${Date.now()}`,
      name: petName.trim(),
      type: selectedType,
      emoji: typeInfo.emoji,
      brief: petBrief.trim(),
    };

    setPets((currentPets) => [...currentPets, newPet]);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>🐾 My Pets</Text>

      {isEmpty ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🐾</Text>
          <Text style={styles.emptyTitle}>No pets yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the button below to add your first pet
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedPets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <PetCard pet={item} typeLabel={getPetTypeById(item.type)?.label} />
          )}
        />
      )}

      <Pressable style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText}>+ Add a Pet</Text>
      </Pressable>

      <AddPetModal
        visible={modalVisible}
        petName={petName}
        petBrief={petBrief}
        selectedType={selectedType}
        onChangePetName={setPetName}
        onChangePetBrief={setPetBrief}
        onSelectType={setSelectedType}
        onClose={closeModal}
        onConfirm={confirmAddPet}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    color: "#1a1a2e",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  addButton: {
    backgroundColor: "#4e6ef2",
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});