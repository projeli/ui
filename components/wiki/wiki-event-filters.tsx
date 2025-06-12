"use client";

import {
    eventGroupCategoriesTypes,
    EventGroupCategory,
    wikiEventNames,
    WikiEventType,
} from "@/lib/types/wiki-types";
import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { MultiSelect } from "../ui/multi-select";

const getEventTypeOptions = () => {
    return Object.values(eventGroupCategoriesTypes)
        .flatMap((type) => type)
        .map((type) => ({
            value: type,
            label: wikiEventNames[type],
        }));
};

type WikiEventFiltersProps = {
    eventTypes: WikiEventType[];
};

const WikiEventFilters = ({
    eventTypes: it,
}: WikiEventFiltersProps) => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>(it);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleTypeChange = (selected: string[]) => {
        setSelectedTypes(selected);
        updateUrl("types", selected);
    };

    const updateUrl = useCallback(
        _.debounce((name: string, values: string[]) => {
            const params = new URLSearchParams(searchParams);
            if (values.length > 0) {
                params.delete(name);
                values.forEach((value) => {
                    params.append(name, value);
                });
            } else {
                params.delete(name);
            }
            router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
            });
        }, 500),
        [searchParams, pathname, router]
    );

    return (
        <div className="flex flex-wrap gap-2">
            <MultiSelect
                className="flex-1"
                options={getEventTypeOptions()}
                onValueChange={handleTypeChange}
                defaultValue={selectedTypes}
                placeholder="Filter Activities"
                variant="default"
                animation={0}
                maxCount={1}
            />
        </div>
    );
};

export default WikiEventFilters;
