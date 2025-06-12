import "@/app/markdown.css";
import PageContainer from "@/components/layout/page-container";
import Markdown from "@/components/markdown/markdown";
import { Breadcrumbs, withProjects } from "@/components/navigation/breadcrumbs";
import ProjectDetails from "@/components/project/project-details";
import ProjectHeader from "@/components/project/project-header";
import ProjectInfoBanner from "@/components/project/project-info-banner";
import ProjectLinks from "@/components/project/project-links";
import ProjectMembers from "@/components/project/project-members";
import ProjectWikis from "@/components/project/project-wikis";
import { Card } from "@/components/ui/card";
import { projectApi } from "@/lib/api/project/project-api";
import _ from "lodash";
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

    const project = await getProject(slug);

    if (!project) return notFound();

    return (
        <PageContainer>
            <div className="grid mt-8 gap-6">
                <Breadcrumbs links={withProjects([{ label: project.name }])} />
                <ProjectInfoBanner project={project} />
                <ProjectHeader
                    project={project}
                    button={{
                        icon: <Cog />,
                        label: "Open Dashboard",
                        href: `/dashboard/projects/${project.slug}`,
                    }}
                />
                <div className="grid lg:grid-cols-[1fr,18rem] gap-6">
                    <Markdown content={project.content} />
                    <div className="flex flex-col gap-6">
                        <ProjectWikis project={project} />
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
