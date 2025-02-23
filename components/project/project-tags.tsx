"use client";

import _ from "lodash";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";

const ProjectTags = ({
    project,
    filterable = true,
}: {
    project: { category: string; tags: { id: string; name: string }[] };
    filterable?: boolean;
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function createHref(key: string, value: string) {
        const newSearchParams = new URLSearchParams({
            ...Object.fromEntries(searchParams),
            [key]: value,
        }).toString();

        if (!filterable) {
            return `/projects?${newSearchParams}`;
        }

        return `${pathname}?${newSearchParams}`;
    }

    return (
        <div className="flex flex-wrap gap-1">
            <Link href={createHref("categories", project.category)}>
                <Badge variant="muted" className="hover:underline">
                    {_.startCase(project.category)}
                </Badge>
            </Link>
            {project.tags.map((tag) => (
                <Link key={tag.id} href={createHref("tags", tag.name)}>
                    <Badge variant="muted" className="hover:underline">
                        {_.startCase(tag.name)}
                    </Badge>
                </Link>
            ))}
        </div>
    );
};

export default ProjectTags;
