import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
  },
  heroCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
  },
  petEmoji: {
    fontSize: 44,
  },
  petName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a2e",
    marginTop: 8,
  },
  petMeta: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  petBrief: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a2e",
  },
  symptomRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginTop: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#9aa0ad",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#4e6ef2",
    borderColor: "#4e6ef2",
  },
  checkMark: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  symptomLabel: {
    fontSize: 14,
    color: "#202638",
    flex: 1,
  },
  picture: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: "#eef1f7",
  },
  emergencyButton: {
    marginTop: 6,
    backgroundColor: "#d94848",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  emergencyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  emergencyHint: {
    color: "#666",
    fontSize: 12,
    marginTop: 8,
  },
});