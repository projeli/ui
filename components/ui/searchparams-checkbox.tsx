"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import LabeledCheckbox from "./labeled-checkbox";

type SearchparamsCheckboxProps = React.ComponentProps<
    typeof LabeledCheckbox
> & {
    name: string;
};

const SearchparamsCheckbox = ({
    label,
    name,
    value,
    onCheckedChange,
    ...props
}: SearchparamsCheckboxProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const updateUrl = useCallback(
        (checked: boolean) => {
            if (!value) return;
            const params = new URLSearchParams(searchParams);
            if (checked) {
                params.append(name, value as string);
            } else {
                params.delete(name, value as string);
            }
            router.push(`${pathname}?${params.toString()}`);
        },
        [searchParams, pathname, router]
    );

    return (
        <LabeledCheckbox
            label={label}
            name={name}
            onCheckedChange={(e) => {
                if (onCheckedChange) {
                    onCheckedChange(e);
                }
                updateUrl(e as boolean);
            }}
            {...props}
        />
    );
};

export default SearchparamsCheckbox;
