import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  petCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
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
