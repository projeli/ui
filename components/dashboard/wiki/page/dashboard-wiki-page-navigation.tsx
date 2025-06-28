"use client";

import Anchor from "@/components/navigation/anchor";
import { Card } from "@/components/ui/card";
import { Project, ProjectMember } from "@/lib/types/project-types";
import {
    Wiki,
    WikiMember,
    WikiMemberPermissions,
    WikiPage,
} from "@/lib/types/wiki-types";
import { hasWikiPermission } from "@/lib/utils";
import { File, Grid2X2, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import DashboardProjectHeader from "../../project/dashboard-project-header";
import DashboardProjectNavigation from "../../project/dashboard-project-navigation";
import DashboardWikiNavigation from "../dashboard-wiki-navigation";

type DashboardWikiPageNavigationProps = {
    project: Project;
    wiki: Wiki;
    page: WikiPage;
    projectMember: ProjectMember;
    wikiMember: WikiMember;
};

const DashboardWikiPageNavigation = ({
    project,
    wiki,
    page,
    projectMember,
    wikiMember,
}: DashboardWikiPageNavigationProps) => {
    const pathname = usePathname();

    const canEditWikiPages = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.EditWikiPages
    );

    return (
        <Card className="p-6 grid gap-4 overflow-hidden">
            <DashboardProjectHeader project={project} wiki />
            <div className="grid gap-1">
                <h1 className="text-lg font-semibold">Page</h1>
                <Anchor
                    href={`/dashboard/projects/${project.slug}/wiki/pages/${page.slug}`}
                    className="justify-start"
                    variant={
                        pathname ===
                        `/dashboard/projects/${project.slug}/wiki/pages/${page.slug}`
                            ? "default"
                            : "ghost"
                    }
                >
                    <File />
                    Overview
                </Anchor>
                {canEditWikiPages && (
                    <Anchor
                        href={`/dashboard/projects/${project.slug}/wiki/pages/${page.slug}/description`}
                        className="justify-start"
                        variant={
                            pathname ===
                            `/dashboard/projects/${project.slug}/wiki/pages/${page.slug}/description`
                                ? "default"
                                : "ghost"
                        }
                    >
                        <Menu />
                        Description
                    </Anchor>
                )}
                <Anchor
                    href={`/dashboard/projects/${project.slug}/wiki/pages/${page.slug}/categories`}
                    className="justify-start"
                    variant={
                        pathname ===
                        `/dashboard/projects/${project.slug}/wiki/pages/${page.slug}/categories`
                            ? "default"
                            : "ghost"
                    }
                >
                    <Grid2X2 />
                    Categories
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

export default DashboardWikiPageNavigation;
