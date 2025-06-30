"use client";

import {
    Wiki,
    WikiSidebarItem as WikiSidebarItemType,
} from "@/lib/types/wiki-types";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";
import WikiSidebarItem, { isActiveWikiSidebarItem } from "./wiki-sidebar-item";

type WikiSidebarListItemProps = {
    wiki: Wiki;
    title: string;
    slug?: string;
    category?: WikiSidebarItemType[];
};

const WikiSidebarListItem = ({
    wiki,
    title,
    slug,
    category,
}: WikiSidebarListItemProps) => {
    const pathname = usePathname();

    const isOpen = (category: WikiSidebarItemType[]) => {
        return category.some((item) =>
            isActiveWikiSidebarItem(pathname, item.slug!)
        );
    };

    if (category && category.length > 0) {
        return (
            <li>
                <Collapsible className="group" defaultOpen={isOpen(category)}>
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-between text-base"
                        >
                            <span className="text-base font-medium">
                                {title}
                            </span>
                            <ChevronRight className="group-data-[state=open]:rotate-90" />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <ul className="grid ml-4">
                            {category.map((item, i) => (
                                <WikiSidebarItem
                                    key={i}
                                    wiki={wiki}
                                    title={item.title}
                                    slug={item.slug!}
                                    pathname={pathname}
                                />
                            ))}
                        </ul>
                    </CollapsibleContent>
                </Collapsible>
            </li>
        );
    }

    if (slug) {
        return (
            <WikiSidebarItem
                wiki={wiki}
                title={title}
                slug={slug === "wikihomepage" ? "" : slug}
                pathname={pathname}
            />
        );
    }

    return null;
};

export default WikiSidebarListItem;
