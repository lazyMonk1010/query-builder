import {
  useState,
  useCallback,
  createContext,
  useContext,
  Fragment,
  Dispatch,
  SetStateAction
} from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import FilterGroup from "./FilterGroup";
import { RuleGroup } from "./types";

const defaultRuleGroup: RuleGroup = {
  id: 0,
  children: [{ id: 0, type: "rule" }],
  conjunction: "OR",
  not: false,
  type: "rule_group"
};

const QueryContext = createContext({
  groups: [defaultRuleGroup]
});

interface QueryBuilderProps {
  setQueryList: Dispatch<SetStateAction<any>>;
  setShowQuery: Dispatch<SetStateAction<boolean>>;
}

const QueryBuilder: React.FC<QueryBuilderProps> = ({
  setQueryList,
  setShowQuery
}) => {
  const context = useContext(QueryContext);
  const [filterGroups, setFilterGroups] = useState<Array<RuleGroup>>(
    context.groups
  );

  const addNewFilterGroup = useCallback(() => {
    setFilterGroups((filterGroups) =>
      filterGroups.concat({ ...defaultRuleGroup, id: filterGroups.length })
    );
  }, []);

  const updateFilterGroup = useCallback((id: number, ruleGroup: RuleGroup) => {
    setFilterGroups((filterGroups) => {
      return filterGroups.map((group) => {
        if (group.id === id) {
          return { ...group, ...ruleGroup };
        }
        return group;
      });
    });
  }, []);

  const handleFinish = (query: string) => {
    setQueryList((prevList: any) => [...prevList, query]);
    setShowQuery(false); // Close the QueryBuilder modal
  };

  return (
    <div className="flex rounded content-wrapper w-full justify-between">
      <div className="bg-[#1D2025] max-w-[960px] h-[90vh] center-content w-full rounded">
        <div className="flex justify-between items-center bg-[#5C61F0] p-10 text-gray-100 w-full py-[16px] px-[24px] max-h-[116px] h-full">
          <span className="text-white font-[500] leading-[28px]">Build your query</span>
          <button
            onClick={() => setShowQuery(false)}
            className="h-[24px] w-[24px] flex items-center justify-center bg-[#4338CA] font-bold rounded-lg">x</button>
        </div>
        <div className="bg-[#1D2025] shadow-xl p-2 mb-4 border-gray-500 flex flex-col items-start justify-center">
          {filterGroups.map((filterGroup, i) => (
            <Fragment key={`group-${i}`}>
              <FilterGroup
                id={i}
                ruleGroup={filterGroup}
                onChange={updateFilterGroup}
                onFinish={handleFinish} // Pass the handleFinish callback
              />
              <div className="bg-indigo-400 border-indigo-400 h-10 mx-4 -my-4 border flex flex-col" />
            </Fragment>
          ))}
          <button
            className="bg-[#4F46E5] shadow-xl px-3 py-2 mt-4 mb-4 rounded text-gray-100 self-start submitBtn"
            onClick={addNewFilterGroup}
          >
            <span className="flex flex-row items-center justify-between pointer-events-none">
              <PlusIcon className="h-5 w-5 text-white" aria-hidden="true" />
              Add new group filter
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryBuilder;
