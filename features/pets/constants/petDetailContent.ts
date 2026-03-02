import type { PetTypeId } from "@/features/pets/constants/petTypes";

export interface PetDetailContent {
  commonSymptoms: string[];
  pictureUrls: string[];
}

export const PET_DETAIL_CONTENT: Record<PetTypeId, PetDetailContent> = {
  d: {
    commonSymptoms: ["Loss of appetite", "Vomiting", "Lethargy"],
    pictureUrls: [
      "https://placehold.co/600x380/png?text=Dog+Photo+1",
      "https://placehold.co/600x380/png?text=Dog+Photo+2",
    ],
  },
  c: {
    commonSymptoms: ["Sneezing", "Hiding behavior", "Reduced eating"],
    pictureUrls: [
      "https://placehold.co/600x380/png?text=Cat+Photo+1",
      "https://placehold.co/600x380/png?text=Cat+Photo+2",
    ],
  },
  f: {
    commonSymptoms: ["Floating sideways", "White spots", "Rapid gill movement"],
    pictureUrls: [
      "https://placehold.co/600x380/png?text=Fish+Photo+1",
      "https://placehold.co/600x380/png?text=Fish+Photo+2",
    ],
  },
  r: {
    commonSymptoms: ["Runny nose", "Teeth grinding", "Low activity"],
    pictureUrls: [
      "https://placehold.co/600x380/png?text=Rabbit+Photo+1",
      "https://placehold.co/600x380/png?text=Rabbit+Photo+2",
    ],
  },
  b: {
    commonSymptoms: ["Fluffed feathers", "Tail bobbing", "Less vocalization"],
    pictureUrls: [
      "https://placehold.co/600x380/png?text=Bird+Photo+1",
      "https://placehold.co/600x380/png?text=Bird+Photo+2",
    ],
  },
  h: {
    commonSymptoms: ["Weight loss", "Wet tail", "Labored breathing"],
    pictureUrls: [
      "https://placehold.co/600x380/png?text=Hamster+Photo+1",
      "https://placehold.co/600x380/png?text=Hamster+Photo+2",
    ],
  },
  t: {
    commonSymptoms: ["Soft shell", "Swollen eyes", "Lack of basking"],
    pictureUrls: [
      "https://placehold.co/600x380/png?text=Turtle+Photo+1",
      "https://placehold.co/600x380/png?text=Turtle+Photo+2",
    ],
  },
  gp: {
    commonSymptoms: ["Hair loss", "Crusty skin", "Not eating hay"],
    pictureUrls: [
      "https://placehold.co/600x380/png?text=Guinea+Pig+Photo+1",
      "https://placehold.co/600x380/png?text=Guinea+Pig+Photo+2",
    ],
  },
};