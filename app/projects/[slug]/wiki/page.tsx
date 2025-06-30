import "@/app/markdown.css";
import PageContainer from "@/components/layout/page-container";
import Markdown from "@/components/markdown/markdown";
import { Breadcrumbs, withProject } from "@/components/navigation/breadcrumbs";
import ProjectImage from "@/components/project/project-image";
import AvatarGroup from "@/components/ui/avatar-group";
import WikiInfoBanner from "@/components/wiki/wiki-info-banner";
import WikiSidebar from "@/components/wiki/wiki-sidebar";
import { TableOfContents } from "@/components/wiki/wiki-table-of-contents";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { getWikiMember } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

type Props = {
    params: Promise<{ slug: string }>;
};

const getProject = cache(async (slug: string) => {
    return await projectApi.getBySlug(slug);
});

const getWiki = cache(async (projectId: string) => {
    return await wikiApi.getByProjectId(projectId);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) return {};

    const title = `${project.name} - Wiki`;
    const description = project.summary;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: project.imageUrl,
                    alt: project.name,
                },
            ],
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const { userId } = await auth();

    const project = await getProject(slug);
    if (!project) return notFound();

    const wiki = await getWiki(project.id);
    if (!wiki) return notFound();

    const wikiMember = getWikiMember(userId, wiki);

    const updatedAt = wiki.updatedAt ? new Date(wiki.updatedAt) : null;
    const publishedAt = wiki.publishedAt ? new Date(wiki.publishedAt) : null;

    const shownDate = (() => {
        const isValidDate = (date: Date | null): date is Date =>
            date instanceof Date &&
            !isNaN(date.getTime()) &&
            date.getTime() !== 0;

        if (!isValidDate(updatedAt) && !isValidDate(publishedAt)) {
            return null;
        }

        return updatedAt && publishedAt && updatedAt > publishedAt
            ? updatedAt
            : publishedAt;
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
                    <WikiInfoBanner
                        wiki={wiki}
                        wikiMember={wikiMember}
                        className="mb-6"
                    />
                    <div className="mb-6">
                        <Breadcrumbs
                            links={withProject(
                                { name: wiki.projectName, slug },
                                [{ label: "Wiki" }]
                            )}
                        />
                    </div>
                    <div className="mb-6 flex gap-4">
                        <div>
                            <ProjectImage
                                project={{
                                    name: wiki.projectName,
                                    slug: wiki.projectSlug,
                                    imageUrl: wiki.projectImageUrl,
                                }}
                                size="md"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-4xl font-bold">
                                {wiki.projectName}
                            </p>
                            <div className="text-sm text-muted-foreground flex justify-between items-center">
                                <div>{shownDate?.toLocaleDateString()}</div>
                                <div>
                                    <Suspense>
                                        <AvatarGroup
                                            users={wiki.members}
                                            title="Editors"
                                        />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 xl:hidden">
                        <TableOfContents
                            wikiMember={wikiMember}
                            wiki={wiki}
                            defaultOpen={false}
                        />
                    </div>
                    <div>
                        <Markdown content={wiki.content || ""} />
                    </div>
                </div>
                <div className="relative hidden xl:block">
                    <div className="sticky top-28">
                        <TableOfContents
                            wikiMember={wikiMember}
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
