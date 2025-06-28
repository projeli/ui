"use client";

import { Project, ProjectMember } from "@/lib/types/project-types";
import {
    Wiki,
    WikiMember,
    WikiMemberPermissions,
} from "@/lib/types/wiki-types";
import { hasWikiPermission } from "@/lib/utils";
import { BookOpen, Grid2X2, Library, List, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Anchor from "../../navigation/anchor";
import { Card } from "../../ui/card";
import DashboardProjectHeader from "../project/dashboard-project-header";
import DashboardProjectNavigation from "../project/dashboard-project-navigation";

type DashboardWikiNavigationProps = {
    project: Project;
    wiki?: Wiki;
    simple?: boolean;
    projectMember: ProjectMember;
    wikiMember?: WikiMember;
};

const DashboardWikiNavigation = ({
    project,
    wiki,
    simple,
    projectMember,
    wikiMember,
}: DashboardWikiNavigationProps) => {
    if (simple) {
        return (
            <Navigation
                project={project}
                wiki={wiki}
                projectMember={projectMember}
                wikiMember={wikiMember}
            />
        );
    }

    return (
        <Card className="p-6 grid gap-4 overflow-hidden">
            <DashboardProjectHeader project={project} wiki />
            <Navigation
                project={project}
                wiki={wiki}
                projectMember={projectMember}
                wikiMember={wikiMember}
            />
            <DashboardProjectNavigation
                project={project}
                projectMember={projectMember}
                simple
            />
        </Card>
    );
};

const Navigation = ({
    project,
    wiki,
    projectMember,
    wikiMember,
}: {
    project: Project;
    wiki?: Wiki;
    projectMember: ProjectMember;
    wikiMember?: WikiMember;
}) => {
    const pathname = usePathname();

    const canEdit = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.EditWiki
    );
    const canArchive = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.ArchiveWiki
    );
    const canDelete = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.DeleteWiki
    );

    return (
        <div className="grid gap-1">
            <h1 className="text-lg font-semibold">Wiki</h1>
            <Anchor
                href={`/dashboard/projects/${project.slug}/wiki`}
                className="justify-start"
                variant={
                    pathname === `/dashboard/projects/${project.slug}/wiki`
                        ? "default"
                        : "ghost"
                }
            >
                <BookOpen />
                Overview
            </Anchor>
            {wiki && (
                <>
                    {(canEdit || canArchive || canDelete) && (
                        <Anchor
                            href={`/dashboard/projects/${project.slug}/wiki/details`}
                            className="justify-start"
                            variant={
                                pathname ===
                                `/dashboard/projects/${project.slug}/wiki/details`
                                    ? "default"
                                    : "ghost"
                            }
                        >
                            <List />
                            Details
                        </Anchor>
                    )}
                    {canEdit && (
                        <Anchor
                            href={`/dashboard/projects/${project.slug}/wiki/description`}
                            className="justify-start"
                            variant={
                                pathname ===
                                `/dashboard/projects/${project.slug}/wiki/description`
                                    ? "default"
                                    : "ghost"
                            }
                        >
                            <Menu />
                            Description
                        </Anchor>
                    )}
                    <Anchor
                        href={`/dashboard/projects/${project.slug}/wiki/pages`}
                        className="justify-start"
                        variant={
                            pathname ===
                            `/dashboard/projects/${project.slug}/wiki/pages`
                                ? "default"
                                : "ghost"
                        }
                    >
                        <Library />
                        Pages
                    </Anchor>
                    <Anchor
                        href={`/dashboard/projects/${project.slug}/wiki/categories`}
                        className="justify-start"
                        variant={
                            pathname ===
                            `/dashboard/projects/${project.slug}/wiki/categories`
                                ? "default"
                                : "ghost"
                        }
                    >
                        <Grid2X2 />
                        Categories
                    </Anchor>
                </>
            )}
        </div>
    );
};

export default DashboardWikiNavigation;
