"use client";

import { Project } from "@/lib/types/project-types";
import { Wiki } from "@/lib/types/wiki-types";
import { BookOpen, Cog, Grid2X2, Library } from "lucide-react";
import { usePathname } from "next/navigation";
import Anchor from "../../navigation/anchor";
import { Card } from "../../ui/card";
import DashboardProjectHeader from "../project/dashboard-project-header";
import DashboardProjectNavigation from "../project/dashboard-project-navigation";

type DashboardWikiNavigationProps = {
    project: Project;
    wiki: Wiki;
};

const DashboardWikiNavigation = ({
    project,
    wiki,
}: DashboardWikiNavigationProps) => {
    const pathname = usePathname();

    return (
        <Card className="p-6 grid gap-4 overflow-hidden">
            <DashboardProjectHeader project={project} wiki />
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
                {["Published", "Draft"].includes(wiki.status) && (
                    <>
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
                        <Anchor
                            href={`/dashboard/projects/${project.slug}/wiki/settings`}
                            className="justify-start"
                            variant={
                                pathname ===
                                `/dashboard/projects/${project.slug}/wiki/settings`
                                    ? "default"
                                    : "ghost"
                            }
                        >
                            <Cog />
                            Settings
                        </Anchor>
                    </>
                )}
            </div>
            <DashboardProjectNavigation project={project} simple />
        </Card>
    );
};

export default DashboardWikiNavigation;
