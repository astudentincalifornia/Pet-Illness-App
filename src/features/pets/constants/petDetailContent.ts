import type { PetTypeId } from "@/features/pets/constants/petTypes";

export interface PetDetailContent {
  commonSymptoms: string[];
}

export const PET_DETAIL_CONTENT: Record<PetTypeId, PetDetailContent> = {
  d: {
    commonSymptoms: ["Loss of appetite", "Vomiting", "Lethargy"],
  },
  c: {
    commonSymptoms: ["Sneezing", "Hiding behavior", "Reduced eating"],
  },
  f: {
    commonSymptoms: ["Floating sideways", "White spots", "Rapid gill movement"],
  },
  r: {
    commonSymptoms: ["Runny nose", "Teeth grinding", "Low activity"],
  },
  b: {
    commonSymptoms: ["Fluffed feathers", "Tail bobbing", "Less vocalization"],
  },
  h: {
    commonSymptoms: ["Weight loss", "Wet tail", "Labored breathing"],
  },
  t: {
    commonSymptoms: ["Soft shell", "Swollen eyes", "Lack of basking"],
  },
  gp: {
    commonSymptoms: ["Hair loss", "Crusty skin", "Not eating hay"],
  },
};
