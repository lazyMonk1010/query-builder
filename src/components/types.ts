import { fields } from "./data";

export type ConjunctionType = "AND" | "OR";

export type ConditionType =
  | "Equals"
  | "Does not equal"
  | "Like"
  | "Not like"
  | "Is Empty"
  | "Is"
  | "Is not";

export interface Rule {
  id: number;
  field?: typeof fields[number];
  condition?: ConditionType;
  value?: string;
  type: "rule";
}

export interface RuleGroup {
  id: number;
  children: Rule[];
  conjunction: ConjunctionType;
  not?: boolean; // what is this for? Probably linking groups?
  type: "rule_group";
}
