import "@/app/markdown.css";
import PageContainer from "@/components/layout/page-container";
import Markdown from "@/components/markdown/markdown";
import Anchor from "@/components/navigation/anchor";
import { Breadcrumbs, withWiki } from "@/components/navigation/breadcrumbs";
import AvatarGroup from "@/components/ui/avatar-group";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import WikiPageInfoBanner from "@/components/wiki/wiki-page-info-banner";
import WikiSidebar from "@/components/wiki/wiki-sidebar";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
import {
    Wiki,
    WikiMember,
    WikiMemberPermissions,
    WikiPage,
} from "@/lib/types/wiki-types";
import { getWikiMember, hasWikiPermission } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { ChevronRight, Edit } from "lucide-react";
import { Suspense } from "react";
import { TOC } from "react-markdown-toc/server";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string; wikiSlug: string }>;
}) {
    const { slug, wikiSlug } = await params;
    const { userId } = await auth();

    const [wiki, page] = await Promise.all([
        wikiApi.getByProjectSlug(slug),
        wikiPageApi.getByProjectSlugAndSlug(slug, wikiSlug),
    ]);

    const wikiMember = getWikiMember(userId, wiki);

    const updatedAt = new Date(page.updatedAt);
    const publishedAt = new Date(page.publishedAt);

    const shownDate = (() => {
        const isValidDate = (date: Date) =>
            !isNaN(date.getTime()) && date.getTime() !== 0;

        if (!isValidDate(updatedAt) && !isValidDate(publishedAt)) {
            return null;
        }

        return updatedAt > publishedAt ? updatedAt : publishedAt;
    })();

    return (
        <PageContainer size="extra-large">
            <div className="grid lg:grid-cols-[18rem,1fr] xl:grid-cols-[18rem,1fr,18rem] mt-8 gap-y-6">
                <div className="relative">
                    <div className="sticky top-28">
                        <div className="block lg:hidden">
                            <WikiSidebar wiki={wiki} defaultOpen={false} />
                        </div>
                        <div className="hidden lg:block">
                            <WikiSidebar wiki={wiki} defaultOpen={true} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <WikiPageInfoBanner
                        page={page}
                        wiki={wiki}
                        wikiMember={wikiMember}
                        className="mb-6"
                    />
                    <div className="mb-6">
                        <Breadcrumbs
                            links={withWiki({ name: wiki.projectName, slug }, [
                                { label: page.title },
                            ])}
                        />
                    </div>
                    <div className="mb-2">
                        <p className="text-4xl font-bold">{page.title}</p>
                    </div>
                    <div className="mb-6 text-sm text-muted-foreground flex justify-between items-center">
                        <div>{shownDate?.toLocaleDateString()}</div>
                        <div>
                            <Suspense>
                                <AvatarGroup
                                    users={page.editors}
                                    title="Editors"
                                />
                            </Suspense>
                        </div>
                    </div>
                    <div className="mb-6 xl:hidden">
                        <TableOfContents
                            wikiMember={wikiMember}
                            page={page}
                            wiki={wiki}
                            defaultOpen={false}
                        />
                    </div>
                    <div>
                        <Markdown content={page.content || ""} />
                    </div>
                </div>
                <div className="relative hidden xl:block">
                    <div className="sticky top-28">
                        <TableOfContents
                            wikiMember={wikiMember}
                            page={page}
                            wiki={wiki}
                            defaultOpen={true}
                        />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}

type TableOfContentsProps = {
    wikiMember?: WikiMember;
    page: WikiPage;
    wiki: Wiki;
    defaultOpen: boolean;
};

const TableOfContents = ({
    wikiMember,
    page,
    wiki,
    defaultOpen,
}: TableOfContentsProps) => {
    return (
        <div className="flex flex-col md:flex-row-reverse xl:flex-col justify-between gap-2 xl:gap-6 xl:ml-8">
            <div className="flex xl:justify-end h-9">
                {wikiMember &&
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
            </div>
            <div className="markdown-toc bg-muted xl:bg-transparent flex-1 max-w-sm rounded-lg xl:rounded-none p-4 xl:p-0">
                <Collapsible className="group" defaultOpen={defaultOpen}>
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
                                markdown={page.content || ""}
                                throttleTime={100}
                                a="block break-words !py-[1px] border-l-2 border-border data-[active=true]:text-primary data-[active=true]:border-primary hover:text-secondary hover:border-l-2 hover:border-secondary"
                                scrollAlign="start"
                            />
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};
