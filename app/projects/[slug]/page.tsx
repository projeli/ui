import "@/app/markdown.css";
import PageContainer from "@/components/layout/page-container";
import Anchor from "@/components/navigation/anchor";
import ProjectDetails from "@/components/project/project-details";
import ProjectImage from "@/components/project/project-image";
import ProjectLinks from "@/components/project/project-links";
import ProjectMembers from "@/components/project/project-members";
import ProjectTags from "@/components/project/project-tags";
import { Card } from "@/components/ui/card";
import { projectApi } from "@/lib/api/project/project-api";
import { defaultSchema } from "hast-util-sanitize";
import _ from "lodash";
import { Cog, Rocket } from "lucide-react";
import type { Code, Node, Parent } from "mdast";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cache, Suspense } from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

interface TitleNode extends Node {
    type: "paragraph";
    data: {
        hName: "div";
        hProperties: {
            [key: string]: string;
        };
    };
    children: any[];
}

const languageMap: Record<string, string> = {
    json: "JSON",
    cs: "C#",
    js: "JavaScript",
    ts: "TypeScript",
    py: "Python",
    rb: "Ruby",
    php: "PHP",
    cpp: "C++",
    c: "C",
    java: "Java",
};

const remarkCodeHeaders: Plugin<[], Node> = () => {
    return (tree: Node, file: VFile) => {
        visit(
            tree,
            "code",
            (node: Code, index: number | null, parent: Parent | null) => {
                if (!node.lang) return;

                const displayLanguage =
                    languageMap[node.lang.toLowerCase()] || node.lang;

                const titleNode: TitleNode = {
                    type: "paragraph",
                    data: {
                        hName: "div",
                        hProperties: {
                            className: "code-title",
                        },
                    },
                    children: [
                        {
                            type: "element",
                            data: {
                                hName: "span",
                                hProperties: {
                                    className: "code-language",
                                },
                            },
                            children: [
                                {
                                    type: "text",
                                    value: displayLanguage,
                                },
                            ],
                        },
                        {
                            type: "button",
                            data: {
                                hName: "button",
                                hProperties: {
                                    className: "code-copy",
                                    "aria-label": "Copy code",
                                },
                            },
                        },
                    ],
                };

                if (parent && index !== null) {
                    parent.children.splice(index, 0, titleNode);
                    // Skip the newly inserted title node and the code node
                    return index + 2;
                }
            }
        );
    };
};

type Props = {
    params: Promise<{ slug: string }>;
};

const getProject = cache(async (slug: string) => {
    return await projectApi.getBySlug(slug);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const project = await getProject(slug);

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

const customSchema = {
    ...defaultSchema,
    tagNames: [...(defaultSchema.tagNames || []), "div"],
    attributes: {
        ...defaultSchema.attributes,
        div: [...(defaultSchema.attributes?.div || []), "className"],
    },
};

export default async function Page({
    params,
}: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;

    const project = await getProject(slug);

    console.log(project);

    return (
        <PageContainer>
            <div className="grid mt-8 gap-6">
                {!project.isPublished && (
                    <Card className="px-6 py-4 bg-destructive flex justify-between items-center">
                        <p className="text-sm text-destructive-foreground">
                            This project is not published and can only be viewed
                            by its members.
                        </p>
                        <Anchor
                            href={`/dashboard/projects/${project.slug}`}
                            variant="outline"
                        >
                            <Rocket />
                            Publish Project
                        </Anchor>
                    </Card>
                )}
                <div className="flex justify-between items-end pb-6 border-b border-border">
                    <div className="grid grid-cols-[96px,minmax(0,1fr)] grid-rows-[max-content,max-content,1fr] gap-x-2 sm:gap-x-6">
                        <div className="row-span-2 sm:row-span-3">
                            <ProjectImage project={project} />
                        </div>
                        <h1 className="text-3xl font-bold">{project.name}</h1>
                        <div>
                            <p className="text-card-foreground/80 line-clamp-2 sm:line-clamp-none text-sm sm:text-base">
                                {project.summary}
                            </p>
                        </div>
                        <div className="col-span-2 sm:col-span-1 mt-2 sm:mt-0">
                            <ProjectTags project={project} filterable={false} />
                        </div>
                    </div>
                    <Anchor
                        href={`/projects/${project.slug}/edit`}
                        variant="outline"
                    >
                        <Cog className="!size-5" />
                        Edit Project
                    </Anchor>
                </div>
                <div className="grid lg:grid-cols-[1fr,18rem] gap-6">
                    <div className="markdown-body">
                        <MDXRemote
                            source={project.content}
                            options={{
                                mdxOptions: {
                                    rehypePlugins: [
                                        // [rehypeSanitize, customSchema],
                                        rehypeHighlight,
                                        rehypeSlug,
                                    ],
                                    remarkPlugins: [
                                        remarkCodeHeaders,
                                        remarkGfm,
                                    ],
                                },
                            }}
                        />
                    </div>
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
