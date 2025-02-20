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
import { CalendarArrowUp, CalendarSync, Target } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function ProjectOrderSelect({
  order
}: {
  order: string;
}) {
    const name = "order";

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
        <Select defaultValue={order} onValueChange={updateUrl}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an order" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="relevance">
                        <span className="flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Relevance
                        </span>
                    </SelectItem>
                    <SelectItem value="published">
                        <span className="flex items-center gap-2">
                            <CalendarArrowUp className="w-4 h-4" />
                            Published
                        </span>
                    </SelectItem>
                    <SelectItem value="updated">
                        <span className="flex items-center gap-2">
                            <CalendarSync className="w-4 h-4" />
                            Updated
                        </span>
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
