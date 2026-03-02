import { Pressable, Text, View } from "react-native";

import { styles } from "@/features/pets/components/PetCard.styles";
import type { Pet } from "@/features/pets/types/pet";

interface PetCardProps {
  pet: Pet;
  typeLabel?: string;
  onPress?: () => void;
}

export function PetCard({ pet, typeLabel, onPress }: PetCardProps) {
  return (
    <Pressable style={styles.petCard} onPress={onPress}>
      <Text style={styles.petCardEmoji}>{pet.emoji}</Text>
      <View style={styles.petCardBody}>
        <Text style={styles.petCardName}>{pet.name}</Text>
        <Text style={styles.petCardType}>{typeLabel ?? "Unknown"}</Text>
        <Text style={styles.petCardBrief} numberOfLines={2}>
          {pet.brief}
        </Text>
      </View>
    </Pressable>
  );
}
