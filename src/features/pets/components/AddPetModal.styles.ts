import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  handleArea: {
    paddingTop: 10,
    paddingBottom: 6,
    alignItems: "center",
  },
  handle: {
    width: 52,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#d6dae3",
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 36,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#222",
    marginBottom: 18,
  },
  ageInputRow: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 18,
    gap: 10,
  },
  ageInput: {
    flex: 1,
    marginBottom: 0,
  },
  ageStepper: {
    width: 48,
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e1e5eb",
  },
  ageStepButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ageStepButtonBottom: {
    borderTopWidth: 1,
    borderTopColor: "#e1e5eb",
  },
  ageStepButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4a4a4a",
  },
  briefInput: {
    minHeight: 88,
    marginBottom: 6,
  },
  characterCount: {
    fontSize: 12,
    color: "#777",
    marginBottom: 14,
    textAlign: "right",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  typeChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: "transparent",
  },
  typeChipSelected: {
    borderColor: "#4e6ef2",
    backgroundColor: "#eef1ff",
  },
  typeChipEmoji: {
    fontSize: 20,
    marginRight: 6,
  },
  typeChipLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  typeChipLabelSelected: {
    color: "#4e6ef2",
    fontWeight: "700",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#f1f3f6",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },
  confirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#4e6ef2",
  },
  confirmButtonDisabled: {
    opacity: 0.4,
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});
