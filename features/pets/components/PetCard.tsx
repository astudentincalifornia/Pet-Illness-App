import { StyleSheet, Text, View } from "react-native";

import type { Pet } from "@/features/pets/types/pet";

interface PetCardProps {
  pet: Pet;
  typeLabel?: string;
}

export function PetCard({ pet, typeLabel }: PetCardProps) {
  return (
    <View style={styles.petCard}>
      <Text style={styles.petCardEmoji}>{pet.emoji}</Text>
      <View style={styles.petCardBody}>
        <Text style={styles.petCardName}>{pet.name}</Text>
        <Text style={styles.petCardType}>{typeLabel ?? "Unknown"}</Text>
        <Text style={styles.petCardBrief} numberOfLines={2}>
          {pet.brief}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  petCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  petCardBody: {
    flex: 1,
  },
  petCardEmoji: {
    fontSize: 36,
    marginRight: 14,
  },
  petCardName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  petCardType: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  petCardBrief: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
    lineHeight: 18,
  },
});