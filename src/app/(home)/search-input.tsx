"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParam } from "@/hooks/use-search-params";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

const SearchInput = () => {
    const [value, setValue] = useState("");
    const [search, setSearch] = useSearchParam("search");

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const handleClear = () => {
        setValue("");
        setSearch("");
        inputRef.current?.blur();
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setSearch(value)
        inputRef.current?.blur();
    }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input 
        value={value}
        onChange={handleChange}
        ref={inputRef}
        placeholder="Search"
        className="md:text-base placeholder:text-neutral-700 px-14 w-full border-none shadow-none bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus-visible:bg-white focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)]"
        />
        <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full">
            <SearchIcon />
        </Button>
        {value && 
        <Button
        type="button"
        onClick={handleClear}
        variant="ghost"
        size="icon"
        className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full">
            <XIcon />
        </Button>
        }
      </form>
    </div>
  );
};

export default SearchInput;