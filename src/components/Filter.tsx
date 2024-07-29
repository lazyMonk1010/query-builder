import { useState, useCallback, useEffect } from "react";
import Select from "./headless-ui/Select";
import { TrashIcon } from "@heroicons/react/16/solid";
import { fields, conditions, criterias } from "./data";
import type { Rule, ConditionType } from "./types";

interface Props {
  rule: Rule;
  canDelete: boolean;
  onDelete: (id: number) => void;
  onChange: (id: number, value: Rule) => void;
}

const conditionValues = Array.from(conditions.keys());

const Filter = ({ rule, canDelete, onDelete, onChange }: Props) => {
  const [currentRule, setCurrentRule] = useState(rule);

  const updateField = useCallback((value: string) => {
    setCurrentRule((currentRule) => ({ ...currentRule, field: value }));
  }, []);

  const updateCondition = useCallback((value: string) => {
    setCurrentRule((currentRule) => ({
      ...currentRule,
      condition: value as ConditionType
    }));
  }, []);

  const updateCriteria = useCallback((value: string) => {
    setCurrentRule((currentRule) => ({ ...currentRule, value }));
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(rule.id, currentRule);
    }
  }, [rule.id, currentRule, onChange]);

  return (
    <div className="bg-[#282B30] p-4 flex flex-row content-center">
      <Select
        label="Field"
        options={fields}
        value={rule.field}
        onChange={updateField}
      />
      <Select
        label="Condition"
        options={conditionValues}
        value={rule.condition}
        onChange={updateCondition}
      />
      <Select
        label="Criteria"
        options={criterias}
        value={rule.value}
        onChange={updateCriteria}
      />
      {canDelete ? (
        <button
          className="bg-[#282B30] px-2 py-2 mt-6 mb-4 rounded text-gray-100 self-start submitBtn"
          onClick={onDelete.bind(null, rule.id)}
        >
          <span className="items-center pointer-events-none">
            <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>{" "}
        </button>
      ) : null}
    </div>
  );
};

export default Filter;
