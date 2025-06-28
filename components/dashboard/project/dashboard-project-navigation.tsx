"use client";

import Anchor from "@/components/navigation/anchor";
import { Card } from "@/components/ui/card";
import {
    Project,
    ProjectMember,
    ProjectMemberPermissions,
} from "@/lib/types/project-types";
import { hasProjectPermission } from "@/lib/utils";
import { BookOpen, Box, List, Menu, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import DashboardNavigation from "../dashboard-navigation";
import DashboardProjectHeader from "./dashboard-project-header";

type DashboardNavigationProps = {
    project: Project;
    projectMember: ProjectMember;
    simple?: boolean;
};

const DashboardProjectNavigation = ({
    project,
    projectMember,
    simple,
}: DashboardNavigationProps) => {
    if (simple) {
        return <Navigation project={project} projectMember={projectMember} />;
    }

    return (
        <Card className="p-6 grid gap-4 overflow-hidden">
            <DashboardProjectHeader project={project} />
            <Navigation project={project} projectMember={projectMember} />
        </Card>
    );
};

const Navigation = ({
    project,
    projectMember,
}: {
    project: Project;
    projectMember: ProjectMember;
}) => {
    const pathname = usePathname();

    const hasEditDetailsPermission = hasProjectPermission(
        projectMember,
        ProjectMemberPermissions.EditProject
    );
    const hasManageTagsPermission = hasProjectPermission(
        projectMember,
        ProjectMemberPermissions.ManageTags
    );
    const hasArchiveProjectPermissions = hasProjectPermission(
        projectMember,
        ProjectMemberPermissions.ArchiveProject
    );
    const hasDeleteProjectPermission = hasProjectPermission(
        projectMember,
        ProjectMemberPermissions.DeleteProject
    );

    return (
        <div>
            <div className="grid gap-1">
                <h1 className="text-lg font-semibold">Project</h1>
                <Anchor
                    href={`/dashboard/projects/${project.slug}`}
                    className="justify-start"
                    variant={
                        pathname === `/dashboard/projects/${project.slug}`
                            ? "default"
                            : "ghost"
                    }
                >
                    <Box />
                    Overview
                </Anchor>
                {(hasEditDetailsPermission ||
                    hasManageTagsPermission ||
                    hasArchiveProjectPermissions ||
                    hasDeleteProjectPermission) && (
                    <Anchor
                        href={`/dashboard/projects/${project.slug}/details`}
                        className="justify-start"
                        variant={
                            pathname ===
                            `/dashboard/projects/${project.slug}/details`
                                ? "default"
                                : "ghost"
                        }
                    >
                        <List />
                        Details
                    </Anchor>
                )}
                {hasEditDetailsPermission && (
                    <Anchor
                        href={`/dashboard/projects/${project.slug}/description`}
                        className="justify-start"
                        variant={
                            pathname ===
                            `/dashboard/projects/${project.slug}/description`
                                ? "default"
                                : "ghost"
                        }
                    >
                        <Menu />
                        Description
                    </Anchor>
                )}
                <Anchor
                    href={`/dashboard/projects/${project.slug}/members`}
                    className="justify-start"
                    variant={
                        pathname ===
                        `/dashboard/projects/${project.slug}/members`
                            ? "default"
                            : "ghost"
                    }
                >
                    <Users />
                    Members
                </Anchor>
                <Anchor
                    href={`/dashboard/projects/${project.slug}/wiki`}
                    className="justify-start"
                    variant="ghost"
                >
                    <BookOpen />
                    Wiki
                </Anchor>
            </div>
            <DashboardNavigation titleClassName="text-lg mt-4" />
        </div>
    );
};

export default DashboardProjectNavigation;
