import PageContainer from "@/components/layout/page-container";
import ProjectCard from "@/components/project/project-card";
import ProjectCardTypeSwitch from "@/components/project/project-card-type-switch";
import { ProjectOrderSelect } from "@/components/project/project-order-select";
import { ProjectPageSizeSelect } from "@/components/project/project-page-size-select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { projectApi } from "@/lib/api/project/project-api";
import { cn } from "@/lib/utils";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        order: string;
        pageSize: string;
        layout: "grid" | "list";
    }>;
}) {
    const params = await searchParams;

    // const query = params?.query;
    // const page = Number(params?.page) || 1;
    const order = params?.order || "relevance";
    const pageSize = params?.pageSize || "25";
    const layout = params?.layout || "grid";

    const projects = await projectApi.get();

    return (
        <PageContainer>
            <div className="grid grid-cols-[18rem,auto] gap-6 mt-8">
                <aside>
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold">Categories</h2>
                    </Card>
                </aside>
                <main className="grid grid-cols-1 gap-6">
                    <Card className="p-6 flex gap-4">
                        <Input placeholder="Search projects" />
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
                </main>
            </div>
        </PageContainer>
    );
}
