import "@/app/markdown.css";
import PageContainer from "@/components/layout/page-container";
import Markdown from "@/components/markdown/markdown";
import { Breadcrumbs, withWiki } from "@/components/navigation/breadcrumbs";
import AvatarGroup from "@/components/ui/avatar-group";
import WikiPageInfoBanner from "@/components/wiki/wiki-page-info-banner";
import WikiSidebar from "@/components/wiki/wiki-sidebar";
import { TableOfContents } from "@/components/wiki/wiki-table-of-contents";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
import { getWikiMember } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

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

    const updatedAt = page.updatedAt ? new Date(page.updatedAt) : undefined;
    const publishedAt = page.publishedAt
        ? new Date(page.publishedAt)
        : undefined;

    const shownDate = (() => {
        const isValidDate = (date?: Date) =>
            !isNaN(date?.getTime() || NaN) && date?.getTime() !== 0;

        if (!isValidDate(updatedAt) && !isValidDate(publishedAt)) {
            return null;
        }

        if (isValidDate(updatedAt) && isValidDate(publishedAt)) {
            return updatedAt! > publishedAt! ? updatedAt : publishedAt;
        }

        return updatedAt || publishedAt || null;
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
                            <WikiSidebar
                                wiki={wiki}
                                defaultOpen={true}
                                open={true}
                            />
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
                            open={true}
                        />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
