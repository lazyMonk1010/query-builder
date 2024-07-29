import { useCallback, useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import Toggle from "./headless-ui/Toggle";
import QueryOutput from "./QueryOutput";
import Filter from "./Filter";
import type { Rule, RuleGroup } from "./types";
import { conditions, conjunctions } from "./data";

interface Props {
  id: number;
  ruleGroup: RuleGroup;
  onChange: (id: number, ruleGroup: RuleGroup) => void;
  onFinish: (query: string) => void; // New prop for the Finish button callback
}

const defaultFilter: Rule = { id: 0, type: "rule" };

const FilterGroup = ({ ruleGroup, onChange, onFinish }: Props) => {
  const [conjunction, setConjunction] = useState(ruleGroup.conjunction);
  const [filters, setFilters] = useState<Array<Rule>>(ruleGroup.children);

  const addNewFilter = useCallback(() => {
    setFilters((filters) =>
      filters.concat({ ...defaultFilter, id: filters.length })
    );
  }, []);

  const updateFilter = useCallback((id: number, rule: Rule) => {
    setFilters((filters) => {
      return filters.map((filter) => {
        if (filter.id === id) {
          return { ...filter, ...rule };
        }
        return filter;
      });
    });
  }, []);

  const deleteFilter = useCallback((id: number) => {
    setFilters((filters) => {
      const updatedFilters = filters.filter((f) => f.id !== id);
      return updatedFilters.map((f, i) => ({ ...f, id: i }));
    });
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(ruleGroup.id, {
        id: ruleGroup.id,
        conjunction,
        children: filters,
        type: "rule_group"
      });
    }
  }, [ruleGroup.id, conjunction, filters, onChange]);

  const handleFinish = () => {
    const query = filters
      .map((f) => {
        if (f.field && f.condition && f.value) {
          return `"(field.${f.field.toLowerCase()}) ${conditions.get(
            f.condition
          )} ${f.value}"`;
        }
        return "";
      }, "")
      .filter((s) => s.length > 1)
      .join(` ${conjunctions.get(conjunction)} `);

    onFinish(query); // Call the onFinish callback with the query
  };

  return (
    <div className="bg-[#282B30] border-1 border-[#404348] shadow-xl p-6 mt-28 mb-4 min-w-full flex flex-col justify-between content-center">
      <div>
        <QueryOutput conjunction={conjunction} filters={filters} />
      </div>
      <div className="self-start px-5 text-white">
        <Toggle
          value={conjunction === "OR" ? false : true}
          onChange={(value) => setConjunction(value ? "AND" : "OR")}
        />
      </div>
      {filters.map((filter, i) => (
        <Filter
          key={`filter-${filter.id}-${filter.field}`}
          rule={filter}
          canDelete={i > 0 ? true : false}
          onDelete={deleteFilter}
          onChange={updateFilter}
        />
      ))}
      <button
        className="bg-[#4F46E5] shadow-xl px-3 py-2 mt-4 mx-5 mb-4 rounded text-gray-100 self-start submitBtn"
        onClick={addNewFilter}
      >
        <span className="flex flex-row items-center justify-between pointer-events-none">
          <PlusIcon className="h-5 w-5 text-white" aria-hidden="true" />
          Add filter
        </span>
      </button>
      <button
        className="bg-[#4F46E5] shadow-xl px-3 py-2 mt-4 mx-5 mb-4 rounded text-gray-100 self-start submitBtn"
        onClick={handleFinish} // Handle finish button click
      >
        <span className="flex flex-row items-center justify-between pointer-events-none">
          Finish
        </span>
      </button>
    </div>
  );
};

export default FilterGroup;
