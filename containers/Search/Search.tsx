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

  const handleSearch = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      props.onSearch(search);
    }
  };

  return (
    <div className="w-full overflow-visible">
      <div className="z-20 flex w-full items-center justify-between overflow-visible bg-card px-2 py-1 sm:px-8">
        <div className="flex items-center">
          <Base className="!whitespace-nowrap text-primary">Search:</Base>
          <TextInput
            name="search"
            placeholder="Type keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            divClassName="!my-0 mx-2 sm:mx-4 w-96"
            inputClassName="!bg-white !placeholder-primary !rounded-full"
            inputMode="search"
          />
        </div>
        {props.handleSort && ( // Only show sort if onSort is defined
          <div className="flex items-center">
            <Base className="!whitespace-nowrap text-primary">Sort by:</Base>
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
