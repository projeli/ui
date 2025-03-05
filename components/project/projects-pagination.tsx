import { projectApi } from "@/lib/api/project/project-api";
import { Project } from "@/lib/types/project-types";
import { cn } from "@/lib/utils";
import Anchor from "../navigation/anchor";
import Pagination from "../ui/pagination";
import ProjectCard from "./project-card";

type ProjectsPaginationProps = {
    query: string;
    order: string;
    pageSize: string;
    page: string;
    categories: string[];
    tags: string[];
    userId: string;
    layout: "grid" | "list";
    href: string;
};

const ProjectsPagination = async ({
    layout,
    query,
    order,
    pageSize,
    page,
    categories,
    tags,
    userId,
    href,
}: ProjectsPaginationProps) => {
    const projectsResponse = await projectApi.get({
        query,
        order,
        pageSize,
        page,
        categories,
        tags,
        userId,
    });

    if (!projectsResponse.success) {
        return (
            <div className="flex flex-col items-center p-4 text-destructive">
                <p>Failed to load projects.</p>
                <p>Please try again or contact support.</p>
            </div>
        );
    }

    const projects = projectsResponse.data!;

    if (projects?.length === 0) {
        return (
            <div className="flex flex-col items-center p-4 gap-2">
                <p className="opacity-80">No projects found.</p>
                {page > "1" && (
                    <Anchor href={href} variant="outline" size="sm">
                        Go back
                    </Anchor>
                )}
            </div>
        );
    }

    return (
        <div className="grid gap-6">
            {projectsResponse.totalPages > 1 && (
                <Pagination
                    currentPage={projectsResponse.page}
                    pageSize={projectsResponse.pageSize}
                    totalItems={projectsResponse.totalCount}
                    totalPages={projectsResponse.totalPages}
                />
            )}
            <div
                className={cn(
                    "grid gap-4",
                    layout === "grid" &&
                        "grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]",
                    layout === "list" && "grid-cols-1"
                )}
            >
                {projects.map((project: Project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        layout={layout}
                        href={href}
                    />
                ))}
            </div>
            {projectsResponse.totalPages > 1 && (
                <Pagination
                    currentPage={projectsResponse.page}
                    pageSize={projectsResponse.pageSize}
                    totalItems={projectsResponse.totalCount}
                    totalPages={projectsResponse.totalPages}
                />
            )}
        </div>
    );
};

export default ProjectsPagination;
