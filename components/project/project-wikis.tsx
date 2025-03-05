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

type ProjectWikisProps = {
    projectId?: string;
    wiki?: Wiki;
};

const getWiki = cache(async (projectId: string) => {
    return await wikiApi.getByProjectId(projectId);
});

const ProjectWikis = async ({
    projectId,
    wiki: wikiProp,
}: ProjectWikisProps) => {
    // Use provided wiki object or fetch it using projectId
    const wiki = wikiProp ?? (projectId ? await getWiki(projectId) : null);

    if (!wiki) {
        return null;
    }

    if (!wiki.isCreated) {
        const { userId } = await auth();

        if (wiki.members.some((member) => member.userId === userId)) {
            return (
                <Anchor
                    href={`/dashboard/projects/${wiki.projectSlug}/wiki`}
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
                    <Header projectId={projectId} wiki={wiki} />
                    <div className="grid mt-4">
                        <ul className="grid">
                            <Item wiki={wiki} title={"Home"} href={""} />
                        </ul>
                    </div>
                </div>
                <NotPublishedBanner
                    predicate={!wiki.isPublished}
                    title="Only visible to members (unpublished)"
                    size="sm"
                />
            </Card>
        );
    }

    return (
        <Card className="border-secondary overflow-hidden">
            <div className="p-6">
                <Header projectId={projectId} wiki={wiki} />
                <div className="grid mt-4">
                    <ul className="grid">
                        {wiki.config.sidebar.items.map((item, i) => (
                            <ListItem
                                key={i}
                                wiki={wiki}
                                title={item.title}
                                href={item.href}
                                category={item.category}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <NotPublishedBanner
                predicate={!wiki.isPublished}
                title="Only visible to members (unpublished)"
                size="sm"
            />
        </Card>
    );
};

const ListItem = ({
    wiki,
    title,
    href,
    category,
}: { wiki: Wiki } & WikiSidebarItem) => {
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
                            href={item.href}
                        />
                    ))}
                </ul>
            </li>
        );
    }

    if (href) {
        return <Item wiki={wiki} title={title} href={href} />;
    }

    return null;
};

const Item = ({ wiki, title, href }: { wiki: Wiki } & WikiSidebarItem) => {
    return (
        <li>
            <Anchor
                variant="ghost"
                className="w-full justify-start"
                href={`/projects/${wiki.projectSlug}/wiki/${href}`}
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
