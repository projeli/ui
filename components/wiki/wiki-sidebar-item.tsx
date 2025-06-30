"use client";

import { Wiki } from "@/lib/types/wiki-types";
import Anchor from "../navigation/anchor";

type WikiSidebarItemProps = {
    wiki: Wiki;
    title: string;
    slug: string;
    pathname: string;
};

export function isActiveWikiSidebarItem(
    pathname: string,
    slug: string
): boolean {
    const splitPath = pathname.split("/");
    if (splitPath.length < 5) return !slug;
    const currentSlug = splitPath[4];
    return currentSlug === slug;
}

const WikiSidebarItem = ({
    wiki,
    title,
    slug,
    pathname,
}: WikiSidebarItemProps) => {
    return (
        <li>
            <Anchor
                variant={isActiveWikiSidebarItem(pathname, slug) ? "default" : "ghost"}
                className="w-full justify-start text-base"
                href={`/projects/${wiki.projectSlug}/wiki/${slug}`}
            >
                {title}
            </Anchor>
        </li>
    );
};

export default WikiSidebarItem;
