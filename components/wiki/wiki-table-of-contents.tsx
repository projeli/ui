import {
    Wiki,
    WikiMember,
    WikiMemberPermissions,
    WikiPage,
} from "@/lib/types/wiki-types";
import { hasWikiPermission } from "@/lib/utils";
import { ChevronRight, Edit } from "lucide-react";
import { TOC } from "react-markdown-toc/server";
import Anchor from "../navigation/anchor";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";

type TableOfContentsProps = {
    wikiMember?: WikiMember;
    page?: WikiPage;
    wiki: Wiki;
    defaultOpen: boolean;
    open?: boolean;
};

export const TableOfContents = ({
    wikiMember,
    page,
    wiki,
    defaultOpen,
    open,
}: TableOfContentsProps) => {
    return (
        <div className="flex flex-col md:flex-row-reverse xl:flex-col justify-between gap-2 xl:gap-6 xl:ml-8">
            <div className="flex xl:justify-end h-9">
                {page &&
                    wikiMember &&
                    hasWikiPermission(
                        wikiMember,
                        WikiMemberPermissions.EditWikiPages
                    ) && (
                        <Anchor
                            href={`/dashboard/projects/${wiki.projectSlug}/wiki/pages/${page.slug}/description`}
                            variant="outline"
                            size="sm"
                        >
                            <Edit />
                            Edit Page
                        </Anchor>
                    )}
                {!page &&
                    wikiMember &&
                    hasWikiPermission(
                        wikiMember,
                        WikiMemberPermissions.EditWiki
                    ) && (
                        <Anchor
                            href={`/dashboard/projects/${wiki.projectSlug}/wiki/description`}
                            variant="outline"
                            size="sm"
                        >
                            <Edit />
                            Edit Page
                        </Anchor>
                    )}
            </div>
            <div className="markdown-toc bg-muted xl:bg-transparent flex-1 max-w-sm rounded-lg xl:rounded-none p-4 xl:p-0">
                <Collapsible
                    className="group"
                    defaultOpen={defaultOpen}
                    open={open}
                >
                    <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between group-data-[state=open]:mb-4">
                            <h2 className="xl:text-lg font-semibold">
                                On This Page
                            </h2>
                            <ChevronRight className="block xl:hidden group-data-[state=open]:rotate-90" />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="overflow-y-auto overflow-x-hidden max-h-48 xl:max-h-[calc(100vh-13.5rem)]">
                            <TOC
                                markdown={
                                    page
                                        ? page.content || ""
                                        : wiki.content || ""
                                }
                                throttleTime={100}
                                a="block break-words py-px! border-l-2 border-border data-[active=true]:text-primary data-[active=true]:border-primary hover:text-secondary hover:border-l-2 hover:border-secondary"
                                scrollAlign="start"
                            />
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};
