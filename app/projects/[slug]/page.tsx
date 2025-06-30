import "@/app/markdown.css";
import PageContainer from "@/components/layout/page-container";
import Markdown from "@/components/markdown/markdown";
import Anchor from "@/components/navigation/anchor";
import { Breadcrumbs, withProjects } from "@/components/navigation/breadcrumbs";
import ProjectDetails from "@/components/project/project-details";
import ProjectHeader from "@/components/project/project-header";
import ProjectInfoBanner from "@/components/project/project-info-banner";
import ProjectLinks from "@/components/project/project-links";
import ProjectMembers from "@/components/project/project-members";
import { Card } from "@/components/ui/card";
import { projectApi } from "@/lib/api/project/project-api";
import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { getProjectMember } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import _ from "lodash";
import { BookOpen, Cog } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

type Props = {
    params: Promise<{ slug: string }>;
};

const getProject = cache(async (slug: string) => {
    return await projectApi.getBySlug(slug);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const project = await getProject(slug);

    if (!project) {
        return {
            title: "Project Not Found",
            description: "The project you are looking for could not be found.",
        };
    }

    const title = `${project.name} - ${_.startCase(project.category)}`;
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

    const [project, wiki] = await Promise.all([
        getProject(slug),
        wikiApi.getByProjectSlug(slug),
    ]);

    if (!project) return notFound();

    const projectMember = getProjectMember(userId, project);

    return (
        <PageContainer>
            <div className="grid mt-8">
                <div className="mb-6">
                    <Breadcrumbs
                        links={withProjects([{ label: project.name }])}
                    />
                </div>
                <div className="mb-6">
                    <ProjectInfoBanner
                        project={project}
                        projectMember={projectMember}
                    />
                </div>
                <div className="mb-4">
                    <ProjectHeader
                        project={project}
                        projectMember={projectMember}
                    />
                </div>
                <div className="flex gap-2 mb-4 flex-wrap">
                    {!wiki && projectMember && (
                        <Anchor
                            href={`/dashboard/projects/${project.slug}/wiki`}
                            className="text-sm"
                            variant="outline"
                        >
                            Create wiki
                        </Anchor>
                    )}
                    {wiki && (
                        <Anchor
                            href={`/projects/${project.slug}/wiki`}
                            className="text-sm"
                            variant="outline"
                        >
                            <BookOpen />
                            Wiki
                        </Anchor>
                    )}
                    {projectMember && (
                        <Anchor
                            href={`/dashboard/projects/${project.slug}`}
                            className="text-sm"
                            variant="outline"
                        >
                            <Cog />
                            Dashboard
                        </Anchor>
                    )}
                </div>
                <div className="grid lg:grid-cols-[1fr,18rem] gap-6">
                    <Markdown content={project.content} />
                    <div className="flex flex-col gap-6">
                        {project.links.length > 0 && (
                            <ProjectLinks links={project.links} />
                        )}
                        <Suspense
                            fallback={
                                <Card className="p-6">
                                    <h2 className="text-lg font-semibold pb-2 border-b border-border">
                                        Members
                                    </h2>
                                    <div className="grid mt-4">
                                        <p className="text-card-foreground/50">
                                            Loading members...
                                        </p>
                                    </div>
                                </Card>
                            }
                        >
                            <ProjectMembers
                                project={project}
                                memberIds={project.members.map((m) => m.userId)}
                            />
                        </Suspense>
                        <ProjectDetails project={project} />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
