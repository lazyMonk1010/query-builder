// Source - https://headlessui.dev/react/switch

import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Toggle({ value, onChange }: Props) {
  const [enabled, setEnabled] = useState(value);

  useEffect(() => {
    if (onChange) {
      onChange(enabled);
    }
  }, [enabled, onChange]);

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-blue-600" : "bg-[#1D2025] border border-white"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-gray-100 rounded-full transition-transform`}
          />
        </Switch>
        <Switch.Label className="ml-2">{enabled ? "AND" : "OR"}</Switch.Label>
      </div>
    </Switch.Group>
  );
}
