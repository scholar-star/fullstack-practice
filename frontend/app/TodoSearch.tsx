"use client"

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";

export default function TodoSearch({ onSearch }: { onSearch: (search: string) => void }) {
    const handleSearch = useDebouncedCallback((search: string) => {
        onSearch(search);
    }, 300);

    return (
        <div className="relative flex w-full items-center justify-center p-1">
            <div className="relative flex w-full max-w-md items-center">
                <input type="text" 
                placeholder="검색어를 입력하세요" 
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 px-4 py-2 border border-sky-400 bg-white rounded-md pr-10" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <SearchIcon className="w-5 h-5"/>
                </div>
            </div>
        </div>
    )
}