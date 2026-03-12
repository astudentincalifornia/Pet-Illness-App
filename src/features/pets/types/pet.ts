import type { PetTypeId } from "@/features/pets/constants/petTypes";

export interface Pet {
  id: string;
  name: string;
  type: PetTypeId;
  emoji: string;
  age: string;
  brief: string;
  emergencyVetPhone: string;
}