"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function ProjectPageSizeSelect({ pageSize }: { pageSize: string }) {
    const options = ["5", "10", "25", "50", "100"];
    const name = "pageSize";

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
        <Select defaultValue={pageSize} onValueChange={updateUrl}>
            <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Select an order" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
