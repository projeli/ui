"use client";

import Anchor from "@/components/navigation/anchor";
import { Card } from "@/components/ui/card";
import { Project, ProjectMember } from "@/lib/types/project-types";
import { Wiki, WikiCategory, WikiMember } from "@/lib/types/wiki-types";
import { File, Library } from "lucide-react";
import { usePathname } from "next/navigation";
import DashboardProjectHeader from "../../project/dashboard-project-header";
import DashboardProjectNavigation from "../../project/dashboard-project-navigation";
import DashboardWikiNavigation from "../dashboard-wiki-navigation";

type DashboardWikiCategoryNavigationProps = {
    project: Project;
    wiki: Wiki;
    category: WikiCategory;
    projectMember: ProjectMember;
    wikiMember: WikiMember;
};

const DashboardWikiCategoryNavigation = ({
    project,
    wiki,
    category,
    projectMember,
    wikiMember,
}: DashboardWikiCategoryNavigationProps) => {
    const pathname = usePathname();

    return (
        <Card className="p-6 grid gap-4 overflow-hidden">
            <DashboardProjectHeader project={project} wiki />
            <div className="grid gap-1">
                <h1 className="text-lg font-semibold">Category</h1>
                <Anchor
                    href={`/dashboard/projects/${project.slug}/wiki/categories/${category.slug}`}
                    className="justify-start"
                    variant={
                        pathname ===
                        `/dashboard/projects/${project.slug}/wiki/categories/${category.slug}`
                            ? "default"
                            : "ghost"
                    }
                >
                    <File />
                    Overview
                </Anchor>
                <Anchor
                    href={`/dashboard/projects/${project.slug}/wiki/categories/${category.slug}/pages`}
                    className="justify-start"
                    variant={
                        pathname ===
                        `/dashboard/projects/${project.slug}/wiki/categories/${category.slug}/pages`
                            ? "default"
                            : "ghost"
                    }
                >
                    <Library />
                    Pages
                </Anchor>
            </div>
            <DashboardWikiNavigation
                project={project}
                wiki={wiki}
                projectMember={projectMember}
                wikiMember={wikiMember}
                simple
            />
            <DashboardProjectNavigation
                project={project}
                projectMember={projectMember}
                simple
            />
        </Card>
    );
};

export default DashboardWikiCategoryNavigation;
