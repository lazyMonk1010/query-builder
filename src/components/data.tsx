import { ConditionType, ConjunctionType } from "./types";

export const conjunctions = new Map<ConjunctionType, string>([
  ["OR", "||"],
  ["AND", "&&"]
]);

export const fields: Array<string> = [
  "Theme",
  "Sub-theme",
  "Reason",
  "Language",
  "Source",
  "Rating",
  "Time Period",
  "Customer ID"
];

export const conditions = new Map<ConditionType, string>([
  ["Equals", "=="],
  ["Does not equal", "!="],
  ["Like", "LIKE"],
  ["Not like", "NOT LIKE"],
  ["Is Empty", "IS NULL"],
  ["Is", "IS"],
  ["Is not", "IS (NOT)"]
]);

export const criterias: Array<string> = [
  "Offers",
  "Performance",
  "Platform",
  "Product Feedback"
];
