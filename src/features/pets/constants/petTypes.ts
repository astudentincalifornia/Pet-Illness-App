export const PET_TYPES = [
  { id: "d", label: "Dog", emoji: "🐶" },
  { id: "c", label: "Cat", emoji: "🐱" },
  { id: "f", label: "Fish", emoji: "🐟" },
  { id: "r", label: "Rabbit", emoji: "🐰" },
  { id: "b", label: "Bird", emoji: "🐦" },
  { id: "h", label: "Hamster", emoji: "🐹" },
  { id: "t", label: "Turtle", emoji: "🐢" },
  { id: "gp", label: "Guinea Pig", emoji: "🐹" },
] as const;

export type PetTypeId = (typeof PET_TYPES)[number]["id"];

export const getPetTypeById = (typeId: PetTypeId) => {
  return PET_TYPES.find((type) => type.id === typeId);
};