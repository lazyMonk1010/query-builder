// Source - https://tailwindui.com/components/application-ui/elements/dropdowns

/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  label: string;
  options: Array<string>;
  value?: string;
  onChange: (value: string) => void;
}

export default function Select({
  label,
  options = [],
  value,
  onChange
}: Props) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    if (onChange && selected) {
      onChange(selected);
    }
  }, [selected, onChange]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="flex flex-col text-left mx-1 w-48">
        <Listbox.Label className="block text-sm font-medium text-white">
          {label}
        </Listbox.Label>
        <div className="mt-1 relative">
          <Listbox.Button className="relative min-w-full bg-[#404348] border-[#282B30] rounded-md shadow-sm pl-1 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm flex flex-col">
            <span className="flex items-center">
              <span className="ml-3 block text-white">
                {selected || `Select ${label.toLowerCase()}`}
              </span>
            </span>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 min-w-max bg-[#404348] shadow-lg max-h-80 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {options.map((option, i) => (
                <Listbox.Option
                  key={`${option}-${i}`}
                  className={({ active }) =>
                    classNames(
                      active ? "text-white bg-indigo-600" : "text-white",
                      "cursor-default select-none relative py-2 pl-3 pr-9"
                    )
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center min-w-max">
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "ml-3 block"
                          )}
                        >
                          {option}
                        </span>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "ml-3 block"
                          )}
                        >
                          {selected}
                        </span>
                      </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
}
