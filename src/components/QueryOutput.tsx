import { useMemo } from "react";
import { conditions, conjunctions } from "./data";
import type { Rule, ConjunctionType } from "./types";

interface Props {
  conjunction: ConjunctionType;
  filters: Array<Rule>;
}

const QueryOutput = ({ conjunction, filters }: Props) => {
  const buildQuery = useMemo(() => {
    return filters
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
  }, [filters, conjunction]);

  return buildQuery.length > 0 ? (
    <div className="bg-blue-100 m-5 p-1 rounded flex self-start">
      <span className="font-bold">Query:</span>{" "}
      <span className="italic">{buildQuery}</span>
    </div>
  ) : null;
};

export default QueryOutput;
