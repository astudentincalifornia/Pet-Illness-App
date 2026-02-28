import type { PetTypeId } from "@/features/pets/constants/petTypes";

export interface Pet {
  id: string;
  name: string;
  type: PetTypeId;
  emoji: string;
  brief: string;
}