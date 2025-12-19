"use client";

import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const modelOptions = [
  {
    value: "gpt-safeguard-oss-20b",
    title: "GPT OSS Safeguard 20B",
    description: "Safety reasoning models built-upon gpt-oss.",
    current: true,
  },
  {
    value: "llama-guard-3-8B",
    title: "Llama Guard 3.1 8B (Coming Soon)",
    description:
      "Llama Guard 3 is a Llama-3.1-8B pretrained model, fine-tuned for content safety classification.",
    current: false,
    disabled: true,
  },
];

export default function ModelSwitcher() {
  const [selected, setSelected] = useState(modelOptions[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="sr-only">Change published status</Label>
      <div className="relative">
        <div className="inline-flex divide-x divide-neutral-700 rounded-md outline-hidden dark:divide-neutral-600">
          <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-neutral-600 px-3 py-2 text-white dark:bg-neutral-500">
            <CheckIcon aria-hidden="true" className="-ml-0.5 size-5" />
            <p className="text-sm font-semibold">{selected.title}</p>
          </div>
          <ListboxButton className="inline-flex items-center rounded-l-none rounded-r-md bg-neutral-600 p-2 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-neutral-400 dark:bg-neutral-500 dark:hover:bg-neutral-400 dark:focus-visible:outline-neutral-400">
            <span className="sr-only">Change published status</span>
            <ChevronDownIcon
              aria-hidden="true"
              className="size-5 text-white forced-colors:text-[Highlight]"
            />
          </ListboxButton>
        </div>

        <ListboxOptions
          transition
          className="absolute left-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 dark:divide-white/10 dark:bg-neutral-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
        >
          {modelOptions.map((option) => (
            <ListboxOption
              key={option.title}
              value={option}
              disabled={option.disabled}
              className="group cursor-default p-4 text-sm text-gray-900 select-none data-focus:bg-neutral-600 data-focus:text-white dark:text-white dark:data-focus:bg-neutral-500"
            >
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p className="font-normal group-data-selected:font-semibold">
                    {option.title}
                  </p>
                  <span className="text-neutral-600 group-not-data-selected:hidden group-data-focus:text-white dark:text-neutral-400">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </div>
                <p className="mt-2 text-gray-500 group-data-focus:text-neutral-200 dark:text-gray-400 dark:group-data-focus:text-neutral-100">
                  {option.description}
                </p>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
