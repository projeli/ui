"use client";

import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "./input";

type SearchparamsInputProps = React.ComponentProps<"input"> & {
    name: string;
};

const SearchparamsInput = ({ name, ...props }: SearchparamsInputProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const updateUrl = useCallback(
        _.debounce((value: string) => {
            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            router.push(`${pathname}?${params.toString()}`);
        }, 500),
        [searchParams, pathname, router]
    );

    return (
        <Input
            type="text"
            onChange={(e) => updateUrl(e.target.value)}
            {...props}
        />
    );
};

export default SearchparamsInput;
