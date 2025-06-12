import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { Wiki, WikiSidebarItem } from "@/lib/types/wiki-types";
import { auth } from "@clerk/nextjs/server";
import _ from "lodash";
import { ArrowUpRightFromSquare, Cog } from "lucide-react";
import Link from "next/link";
import { cache } from "react";
import NotPublishedBanner from "../banner/not-published-banner";
import Anchor from "../navigation/anchor";
import { Card } from "../ui/card";
import { Project } from "@/lib/types/project-types";

type ProjectWikisProps = {
    project: Project;
    wiki?: Wiki;
};

const getWiki = cache(async (projectId: string) => {
    return await wikiApi.getByProjectId(projectId);
});

const ProjectWikis = async ({
    project,
    wiki: wikiProp,
}: ProjectWikisProps) => {
    // Use provided wiki object or fetch it using projectId
    const wiki = wikiProp ?? (project.id ? await getWiki(project.id) : null);

    if (!wiki) {
        const { userId } = await auth();

        if (project.members.some((member) => member.userId === userId)) {
            return (
                <Anchor
                    href={`/dashboard/projects/${project.slug}/wiki`}
                    variant="outline"
                    className="flex items-center gap-2 p-6 justify-start border-secondary"
                >
                    <Cog className="size-4" />
                    Create Wiki
                </Anchor>
            );
        } else {
            return null;
        }
    }

    if (!wiki.config?.sidebar?.items?.length) {
        return (
            <Card className="border-secondary overflow-hidden">
                <div className="p-6">
                    <Header projectId={project.id} wiki={wiki} />
                    <div className="grid mt-4">
                        <ul className="grid">
                            <Item wiki={wiki} title={"Home"} slug={""} />
                        </ul>
                    </div>
                </div>
                <NotPublishedBanner
                    predicate={wiki.status === "Draft"}
                    title="Only visible to members (unpublished)"
                    size="sm"
                />
            </Card>
        );
    }

    return (
        <Card className="border-secondary overflow-hidden">
            <div className="p-6">
                <Header projectId={project.id} wiki={wiki} />
                <div className="grid mt-4">
                    <ul className="grid">
                        {wiki.config.sidebar.items.map((item, i) => (
                            <ListItem
                                key={i}
                                wiki={wiki}
                                title={item.title}
                                slug={item.slug}
                                category={item.category}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <NotPublishedBanner
                predicate={wiki.status === "Draft"}
                title="Only visible to members (unpublished)"
                size="sm"
            />
        </Card>
    );
};

type WikiSidebarItemProps = {
    wiki: Wiki;
    title: string;
    slug?: string;
    category?: WikiSidebarItem[];
};

const ListItem = ({ wiki, title, slug, category }: WikiSidebarItemProps) => {
    if (category && category.length > 0) {
        return (
            <li className="ml-4">
                <h3 className="text-xs font-semibold mt-4 text-secondary">
                    {_.upperCase(title)}
                </h3>
                <ul className="grid mt-2">
                    {category.map((item, i) => (
                        <Item
                            key={i}
                            wiki={wiki}
                            title={item.title}
                            slug={item.slug!}
                        />
                    ))}
                </ul>
            </li>
        );
    }

    if (slug) {
        return <Item wiki={wiki} title={title} slug={slug} />;
    }

    return null;
};

type ItemProps = {
    wiki: Wiki;
    title: string;
    slug: string;
};

const Item = ({ wiki, title, slug }: ItemProps) => {
    return (
        <li>
            <Anchor
                variant="ghost"
                className="w-full justify-start"
                href={`/projects/${wiki.projectSlug}/wiki/${slug}`}
            >
                {title}
            </Anchor>
        </li>
    );
};

const Header = ({ projectId, wiki }: { projectId?: string; wiki: Wiki }) => {
    if (projectId) {
        return (
            <h2 className="text-lg font-semibold pb-2 border-b border-border hover:underline">
                <Link
                    href={`/projects/${wiki.projectSlug}/wiki`}
                    className="flex items-center gap-2"
                >
                    Wiki
                    <ArrowUpRightFromSquare className="size-4 text-card-foreground/70" />
                </Link>
            </h2>
        );
    }

    return (
        <h2 className="text-lg font-semibold pb-2 border-b border-border">
            Wiki Contents
        </h2>
    );
};

export default ProjectWikis;
