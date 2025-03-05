"use client";

import { Trash } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const ProjectClearFilters = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Check if 'tags' or 'categories' exist in searchParams
    const hasTags = searchParams.has("tags");
    const hasCategories = searchParams.has("categories");
    const shouldDisplay = hasTags || hasCategories;

    // Function to clear filters
    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("tags");
        params.delete("categories");

        // If there are no other params, push just the pathname
        if (params.toString()) {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        } else {
            router.push(pathname, { scroll: false });
        }
    };

    // Only render if there are tags or categories to clear
    if (!shouldDisplay) {
        return null;
    }

    return (
        <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleClearFilters}
        >
            <Trash className="w-5 h-5 mr-2" />
            Clear All Filters
        </Button>
    );
};

export default ProjectClearFilters;
