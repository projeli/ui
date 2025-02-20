"use client";

import _ from "lodash";
import { LayoutGrid, Menu } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";

const ProjectCardTypeSwitch = ({ layout }: { layout: "grid" | "list" }) => {
    const name = "layout";

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
        <Button
            variant="outline"
            className="bg-background size-10"
            onClick={() => updateUrl(layout === "grid" ? "list" : "grid")}
        >
            {layout === "grid" ? <Menu /> : <LayoutGrid />}
        </Button>
    );
};

export default ProjectCardTypeSwitch;
