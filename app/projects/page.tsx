import PageContainer from "@/components/layout/page-container";
import ProjectCard from "@/components/project/project-card";
import ProjectCardTypeSwitch from "@/components/project/project-card-type-switch";
import ProjectCategories from "@/components/project/project-categories";
import ProjectClearFilters from "@/components/project/project-clear-filters";
import { ProjectOrderSelect } from "@/components/project/project-order-select";
import { ProjectPageSizeSelect } from "@/components/project/project-page-size-select";
import { Card } from "@/components/ui/card";
import SearchparamsInput from "@/components/ui/searchparams-input";
import { projectApi } from "@/lib/api/project/project-api";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects - Projeli",
    description:
        "Explore and discover projects created by the community on Projeli.",
};

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        query: string;
        order: string;
        page: string;
        pageSize: string;
        layout: "grid" | "list";
        categories: string | string[];
        tags: string | string[];
    }>;
}) {
    const params = await searchParams;

    const query = params?.query;
    const order = params?.order || "relevance";
    const page = params?.page || "1";
    const pageSize = params?.pageSize || "25";
    const layout = params?.layout || "grid";
    const categories = Array.isArray(params?.categories)
        ? params?.categories
        : [params?.categories];
    const tags = Array.isArray(params?.tags) ? params?.tags : [params?.tags];

    const projects = await projectApi.get({
        query,
        order,
        page,
        pageSize,
        categories,
        tags,
    });

    return (
        <PageContainer>
            <div className="grid md:grid-cols-[18rem,auto] gap-6 mt-8">
                <aside className="flex flex-col gap-6">
                    <ProjectClearFilters />
                    <ProjectCategories
                        categories={categories}
                        className="md:block hidden"
                    />
                </aside>
                <main className="grid grid-cols-1 gap-6 h-max">
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
                        <span className="flex items-center whitespace-nowrap text-sm gap-2">
                            Per page
                            <ProjectPageSizeSelect pageSize={pageSize} />
                        </span>
                        <ProjectCardTypeSwitch layout={layout} />
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
                </main>
            </div>
        </PageContainer>
    );
}
