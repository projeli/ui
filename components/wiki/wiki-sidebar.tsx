import { Wiki } from "@/lib/types/wiki-types";
import { ChevronRight } from "lucide-react";
import NotPublishedBanner from "../banner/not-published-banner";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";
import WikiSidebarListItem from "./wiki-sidebar-list-item";

type WikiSidebarProps = {
    wiki: Wiki;
    defaultOpen: boolean;
};

const WikiSidebar = async ({ wiki, defaultOpen }: WikiSidebarProps) => {
    if (!wiki.config?.sidebar?.items) {
        wiki.config.sidebar.items = [];
    }

    //deep copy the sidebar items to avoid mutating the original wiki object
    const sidebarItems = [...wiki.config.sidebar.items];

    sidebarItems.unshift({
        index: "home",
        title: "Home",
        slug: "wikihomepage",
    });

    return (
        <div className="bg-muted lg:bg-transparent flex-1 max-w-sm rounded-lg lg:rounded-none p-4 lg:p-0">
            <Collapsible className="group" defaultOpen={defaultOpen}>
                <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between group-data-[state=open]:mb-4">
                        <h2 className="lg:text-lg font-semibold">
                            Wiki Contents
                        </h2>
                        <ChevronRight className="block lg:hidden group-data-[state=open]:rotate-90" />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="grid lg:max-h-[calc(100vh-9.75rem)] overflow-y-auto overflow-x-hidden lg:pr-4 lg:mr-4">
                        <div className="rounded-lg overflow-hidden">
                            <NotPublishedBanner
                                predicate={wiki.status === "Draft"}
                                title="Only visible to members (unpublished)"
                                size="sm"
                                className="mb-4"
                            />
                        </div>
                        <ul className="grid">
                            {sidebarItems.map((item, i) => (
                                <WikiSidebarListItem
                                    key={i}
                                    wiki={wiki}
                                    title={item.title}
                                    slug={item.slug}
                                    category={item.category}
                                />
                            ))}
                        </ul>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export default WikiSidebar;
