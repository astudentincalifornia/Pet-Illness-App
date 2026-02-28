export const PET_TYPES = [
  { id: "dog", label: "Dog", emoji: "🐶" },
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "fish", label: "Fish", emoji: "🐟" },
  { id: "rabbit", label: "Rabbit", emoji: "🐰" },
  { id: "bird", label: "Bird", emoji: "🐦" },
  { id: "hamster", label: "Hamster", emoji: "🐹" },
  { id: "turtle", label: "Turtle", emoji: "🐢" },
  { id: "guinea_pig", label: "Guinea Pig", emoji: "🐹" },
] as const;

export type PetTypeId = (typeof PET_TYPES)[number]["id"];

export const getPetTypeById = (typeId: PetTypeId) => {
  return PET_TYPES.find((type) => type.id === typeId);
};