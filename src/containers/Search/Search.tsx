"use client";

import { useState } from "react";

import { TextInput, Dropdown } from "@/components/form";
import { Base } from "@/components/text";

import { sortOptions } from "./config";

type Props = {
  search: string;
  onSearch: (search: string) => void;
  sort?: string;
  handleSort?: (sort: string) => void;
};

export default (props: Props) => {
  const [search, setSearch] = useState(props.search);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      props.onSearch(search);
    }
  };

  return (
    <div className="w-full overflow-visible">
      <div className="w-full py-1 bg-card px-2 sm:px-8 flex justify-between items-center z-20 overflow-visible">
        <div className="flex items-center">
          <Base className="text-primary !whitespace-nowrap">Search:</Base>
          <TextInput
            name="search"
            placeholder="Type keyword"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            divClassName="!my-0 mx-2 sm:mx-4 w-96"
            inputClassName="!bg-white !placeholder-primary !rounded-full"
            inputMode="search"
          />
        </div>
        {props.handleSort && ( // Only show sort if onSort is defined
          <div className="flex items-center">
            <Base className="text-primary !whitespace-nowrap">Sort by:</Base>
            <Dropdown
              name="sort"
              value={props.sort!}
              onChange={(_, choice) => props.handleSort!(choice)}
              options={sortOptions}
              textColor="#CBAE9E"
              isSearchable={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
