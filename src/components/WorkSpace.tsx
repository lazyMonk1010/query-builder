import { Transition } from "@headlessui/react";
import {
  CalendarDateRangeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { Fragment, useState } from "react";
import QueryBuilder from "./QueryBuilder";
import { ArrowDownTrayIcon } from "@heroicons/react/16/solid";

const WorkSpace = () => {
  const [showQuery, setShowQuery] = useState(false);
  const [queryList, setQueryList] = useState<string[]>([]);

  return (
    <>
      <div className="flex max-w-[1200px] w-full justify-between items-start">
        <div className="flex flex-col gap-1 max-w-[200px] items-start p-3">
          <span className="flex gap-1 items-center">
            <FunnelIcon className="text-white h-[20px] w-[20px]" />
            <p className="text-white">Build Your Query</p>
          </span>
          <p className="text-white/50 text-[16px] leading-5">
            Narrow your search further adding some filter
          </p>
          <button
            onClick={() => setShowQuery(true)}
            className="h-[44px] w-[142px] bg-[#5C61F0] text-white rounded-md mt-5"
          >
            Build Query
          </button>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex gap-2">
            <div className="bg-[#404348] flex items-center gap-3 py-1 px-3 rounded-sm">
              <MagnifyingGlassIcon className="text-white/30 h-[20px] w-[20px]" />
              <input
                type="text"
                placeholder="Search for product feedback"
                className="w-[300px] border-none focus:border-none focus:outline-none hover:border-none placeholder:text-white/40 text-white bg-[#404348] custom-input"
              />
            </div>
            <div className="bg-[#404348] flex items-center gap-3 py-1 px-3 rounded-sm">
              <ArrowDownTrayIcon className="w-[20px] h-[20px] text-white/80" />
              <p className="text-white/80">Export Feedback</p>
            </div>
            <div className="bg-[#5C61F0] py-1 px-3 rounded-sm">
              <p className="text-white/80">View Feedback</p>
            </div>
            <div className="bg-[#404348] flex items-center gap-3 py-1 px-3 rounded-sm">
              <CalendarDateRangeIcon className="w-[20px] h-[20px] text-white/80" />
              <p className="text-white/80">July 28, 2023 - July 28, 2024</p>
            </div>
          </div>
          <div className={`flex flex-col ${queryList.length > 0 ? "items-start justify-start" : "items-center justify-center"} w-full border border-[#404348] p-3 h-full min-h-[70vh]`}>
            {queryList.length > 0 ? (
              <div className="w-full flex flex-col gap-2">
                {
                  queryList.map((item , index) => {
                    return (
                      <div
                      className="flex gap-5 text-white bg-[#404348] p-2 rounded-md" 
                      key={index}>
                        <p>Query: </p>
                        <span>{item}</span>
                      </div>
                    )
                  })
                }
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-2 items-center max-w-[250px]">
                <p className="text-white/80 font-semibold text-xl">
                  No Query Yet
                </p>
                <p className="text-white/50 text-center ">
                  You haven't created any query yet click on build query and
                  create
                </p>
                <button
                  onClick={() => setShowQuery(true)}
                  className="h-[44px] w-[142px] bg-[#5C61F0] text-white rounded-md mt-5"
                >
                  Build Query
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Query Model */}
      <Transition
        show={showQuery}
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="overflow-auto fixed inset-0 flex items-center justify-center z-50">
          <div>
            <QueryBuilder
              setQueryList={setQueryList}
              setShowQuery={setShowQuery}
            />
          </div>
        </div>
      </Transition>
    </>
  );
};

export default WorkSpace;
