import { useMemo, useState } from "react";
import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddPetModal } from "@/features/pets/components/AddPetModal";
import { PetCard } from "@/features/pets/components/PetCard";
import {
  getPetTypeById,
  type PetTypeId,
} from "@/features/pets/constants/petTypes";
import { styles } from "@/features/pets/screens/CreatePetProfileScreen.styles";
import type { Pet } from "@/features/pets/types/pet";

export function CreatePetProfileScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<PetTypeId | null>(null);
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
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
    setPetAge("");
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
      age: petAge.trim(),
      type: selectedType,
      emoji: typeInfo.emoji,
      brief: petBrief.trim(),
    };

    setPets((currentPets) => [...currentPets, newPet]);
    setModalVisible(false);
  };

  const openPetDetails = (pet: Pet) => {
    router.push({
      pathname: "/pet/[petId]",
      params: {
        petId: pet.id,
        name: pet.name,
        type: pet.type,
        emoji: pet.emoji,
        brief: pet.brief,
        age: pet.age,
      },
    });
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
            <PetCard
              pet={item}
              typeLabel={getPetTypeById(item.type)?.label}
              onPress={() => openPetDetails(item)}
            />
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
        petAge={petAge}
        selectedType={selectedType}
        onChangePetName={setPetName}
        onChangePetAge={setPetAge}
        onChangePetBrief={setPetBrief}
        onSelectType={setSelectedType}
        onClose={closeModal}
        onConfirm={confirmAddPet}
      />
    </SafeAreaView>
  );
}
