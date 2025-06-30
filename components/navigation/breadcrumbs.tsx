import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fragment, memo } from "react";

interface Link {
    href?: string;
    label: string;
}

interface BreadcrumbsProps {
    links: Link[];
}

export const Breadcrumbs = memo(({ links }: BreadcrumbsProps) => {
    if (!links.length) return null;

    const renderBreadcrumbItem = (link: Link, index: number) => (
        <BreadcrumbItem key={`${link.label}-${index}`}>
            {link.href ? (
                <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
            ) : (
                <BreadcrumbPage>{link.label}</BreadcrumbPage>
            )}
        </BreadcrumbItem>
    );

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {links.length <= 3 ? (
                    links.map((link, index) => (
                        <Fragment key={`${link.label}-${index}`}>
                            {index > 0 && <BreadcrumbSeparator />}
                            {renderBreadcrumbItem(link, index)}
                        </Fragment>
                    ))
                ) : (
                    <>
                        {/* First link */}
                        {renderBreadcrumbItem(links[0], 0)}
                        <BreadcrumbSeparator />

                        {/* Dropdown for middle links */}
                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1">
                                    <BreadcrumbEllipsis className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {links.slice(1, -2).map((link, index) => (
                                        <DropdownMenuItem
                                            key={`${link.label}-${index}`}
                                        >
                                            {link.href ? (
                                                <BreadcrumbLink
                                                    href={link.href}
                                                >
                                                    {link.label}
                                                </BreadcrumbLink>
                                            ) : (
                                                link.label
                                            )}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                        {/* Last two links */}
                        {links.slice(-2).map((link, index) => (
                            <Fragment key={`${link.label}-${index}`}>
                                {renderBreadcrumbItem(
                                    link,
                                    links.length - 2 + index
                                )}
                                {index === 0 && <BreadcrumbSeparator />}
                            </Fragment>
                        ))}
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
});

export const withHome = (links: readonly Link[]): Link[] => [
    { label: "Home", href: "/" },
    ...links,
];

export const withProjects = (links: readonly Link[]): Link[] =>
    withHome([{ label: "Projects", href: "/projects" }, ...links]);

export const withProject = (
    project: { name: string; slug: string },
    links: readonly Link[]
): Link[] =>
    withProjects([
        { label: project.name, href: `/projects/${project.slug}` },
        ...links,
    ]);

export const withWiki = (
    project: { name: string; slug: string },
    links: readonly Link[]
): Link[] =>
    withProject(project, [
        { label: "Wiki", href: `/projects/${project.slug}/wiki` },
        ...links,
    ]);

export const withDashboard = (links: readonly Link[]): Link[] =>
    withHome([{ label: "Dashboard", href: "/dashboard" }, ...links]);

export const withDashboardProjects = (links: readonly Link[]): Link[] =>
    withDashboard([
        { label: "Projects", href: "/dashboard/projects" },
        ...links,
    ]);

export const withDashboardProject = (
    project: { name: string; slug: string },
    links: readonly Link[]
): Link[] =>
    withDashboardProjects([
        { label: project.name, href: `/dashboard/projects/${project.slug}` },
        ...links,
    ]);

export const withDashboardWiki = (
    project: { name: string; slug: string },
    links: readonly Link[]
): Link[] =>
    withDashboardProject(project, [
        { label: "Wiki", href: `/dashboard/projects/${project.slug}/wiki` },
        ...links,
    ]);

export const withDashboardWikiDetails = (
    project: { name: string; slug: string },
    links: readonly Link[]
): Link[] =>
    withDashboardWiki(project, [
        {
            label: "Settings",
            href: `/dashboard/projects/${project.slug}/wiki/details`,
        },
        ...links,
    ]);

export const withDashboardWikiPages = (
    project: { name: string; slug: string },
    links: readonly Link[]
): Link[] =>
    withDashboardWiki(project, [
        {
            label: "Pages",
            href: `/dashboard/projects/${project.slug}/wiki/pages`,
        },
        ...links,
    ]);

export const withDashboardWikiCategories = (
    project: { name: string; slug: string },
    links: readonly Link[]
): Link[] =>
    withDashboardWiki(project, [
        {
            label: "Categories",
            href: `/dashboard/projects/${project.slug}/wiki/categories`,
        },
        ...links,
    ]);

Breadcrumbs.displayName = "Breadcrumbs";
