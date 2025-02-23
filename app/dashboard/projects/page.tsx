import ProjectCard from "@/components/project/project-card";
import ProjectCardTypeSwitch from "@/components/project/project-card-type-switch";
import ProjectCategories from "@/components/project/project-categories";
import ProjectClearFilters from "@/components/project/project-clear-filters";
import { ProjectOrderSelect } from "@/components/project/project-order-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SearchparamsInput from "@/components/ui/searchparams-input";
import { projectApi } from "@/lib/api/project/project-api";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { unauthorized } from "next/navigation";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        query: string;
        layout: "grid" | "list";
        categories: string | string[];
        tags: string | string[];
        order: string;
    }>;
}) {
    const params = await searchParams;

    const query = params?.query;
    const layout = params?.layout || "grid";
    const categories = Array.isArray(params?.categories)
        ? params?.categories
        : [params?.categories];
    const tags = Array.isArray(params?.tags) ? params?.tags : [params?.tags];
    const order = params?.order || "relevance";

    const { userId } = await auth();

    if (!userId) {
        return unauthorized();
    }

    const projects = await projectApi.get({
        query,
        order,
        categories,
        tags,
        userId,
    });

    return (
        <>
            <div className="grid grid-cols-1 gap-6 h-max md:row-span-2">
                <Card className="p-6 flex flex-wrap gap-4">
                    <SearchparamsInput
                        name="query"
                        className="flex-1 min-w-48"
                        placeholder="Search projects"
                        defaultValue={query}
                    />
                    <span className="flex items-center whitespace-nowrap text-sm gap-2">
                        Order by
                        <ProjectOrderSelect order={order} />
                    </span>
                    <ProjectCardTypeSwitch layout={layout} />
                    <Button asChild>
                        <Link href="/dashboard/projects/new">
                            <Plus />
                            New project
                        </Link>
                    </Button>
                </Card>
                {projects.length === 0 ? (
                    <div className="flex justify-center p-4">
                        <p className="opacity-80">No projects found</p>
                    </div>
                ) : (
                    <div
                        className={cn(
                            "grid gap-4",
                            layout === "grid" &&
                                "grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]",
                            layout === "list" && "grid-cols-1"
                        )}
                    >
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                layout={layout}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-6 col-start-1 row-start-1 md:row-start-2">
                <ProjectClearFilters />
                <ProjectCategories
                    categories={categories}
                    className="md:block hidden"
                />
            </div>
        </>
    );
}
