"use client";

import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

type SearchparamsSelectProps = {
    defaultValue?: string;
    placeholder?: string;
    options: { value: string; label: string }[];
    name: string;
    className?: string;
};

const SearchparamsSelect = ({
    defaultValue,
    placeholder,
    options,
    name,
    className
}: SearchparamsSelectProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const updateUrl = useCallback(
        _.debounce((value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);
            router.push(`${pathname}?${params.toString()}`);
        }, 200),
        [searchParams, pathname, router]
    );

    return (
        <Select defaultValue={defaultValue} onValueChange={updateUrl}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SearchparamsSelect;
