import "@/app/markdown.css";
import DashboardGrid from "@/components/dashboard/dashboard-grid";
import PageContainer from "@/components/layout/page-container";
import Markdown from "@/components/markdown/markdown";
import { Breadcrumbs, withProject } from "@/components/navigation/breadcrumbs";
import ProjectHeader from "@/components/project/project-header";
import ProjectLinks from "@/components/project/project-links";
import ProjectWikis from "@/components/project/project-wikis";
import WikiDetails from "@/components/wiki/wiki-details";
import WikiInfoBanner from "@/components/wiki/wiki-info-banner";
import WikiMembers from "@/components/wiki/wiki-members";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { getProjectMember, getWikiMember } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Cog } from "lucide-react";
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

    const projectMember = getProjectMember(userId, project);
    const wikiMember = getWikiMember(userId, wiki);

    return (
        <PageContainer>
            <div className="grid mt-8 gap-6">
                <Breadcrumbs
                    links={withProject(project, [{ label: "Wiki" }])}
                />
                <WikiInfoBanner wiki={wiki} project={project} wikiMember={wikiMember} />
                <ProjectHeader
                    project={project}
                    projectMember={projectMember}
                    button={{
                        href: `/dashboard/projects/${project.slug}/wiki`,
                        icon: <Cog />,
                        label: "Open Dashboard",
                    }}
                    simple
                />
                <DashboardGrid reverse>
                    <div>
                        <Markdown content={wiki.content} />
                    </div>
                    <div className="flex flex-col gap-6">
                        <ProjectWikis project={project} wiki={wiki} />
                        {project.links.length > 0 && (
                            <ProjectLinks links={project.links} />
                        )}
                        <Suspense fallback={<div>Loading authors...</div>}>
                            <WikiMembers
                                wiki={wiki}
                                memberIds={project.members.map((m) => m.userId)}
                            />
                        </Suspense>
                        <WikiDetails wiki={wiki} />
                    </div>
                </DashboardGrid>
            </div>
        </PageContainer>
    );
}
