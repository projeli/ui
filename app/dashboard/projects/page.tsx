import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardNavigation from "@/components/dashboard/dashboard-navigation";
import PageContainer from "@/components/layout/page-container";
import {
    Breadcrumbs,
    withDashboard,
} from "@/components/notification/breadcrumbs";
import ProjectFilters from "@/components/project/project-filters";
import ProjectSearchHeader from "@/components/project/project-search-header";
import ProjectsPagination from "@/components/project/projects-pagination";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { auth } from "@clerk/nextjs/server";
import { unauthorized } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        query: string;
        order: string;
        pageSize: string;
        page: string;
        layout: "grid" | "list";
        categories: string | string[];
        tags: string | string[];
    }>;
}) {
    const params = await searchParams;

    const query = params?.query;
    const order = params?.order || "relevance";
    const pageSize = params?.pageSize || "25";
    const page = params?.page || "1";
    const layout = params?.layout || "grid";
    const categories = Array.isArray(params?.categories)
        ? params?.categories
        : [params?.categories];
    const tags = Array.isArray(params?.tags) ? params?.tags : [params?.tags];

    const { userId } = await auth();

    if (!userId) {
        return unauthorized();
    }

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs links={withDashboard([{ label: "Projects" }])} />
            <DashboardGrid>
                <div className="row-start-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 h-max">
                    <Card className="p-6">
                        <DashboardNavigation />
                    </Card>
                </div>
                <div className="row-start-2 lg:col-start-1 lg:row-start-3 grid gap-6 h-full">
                    <ProjectFilters />
                </div>
                <div className="row-start-3 lg:col-start-2 lg:row-start-1">
                    <ProjectSearchHeader
                        query={query}
                        order={order}
                        pageSize={pageSize}
                        layout={layout}
                        options={{
                            searchBar: true,
                            orderSelect: true,
                            pageSizeSelect: true,
                            layoutSwitch: true,
                            newProjectButton: true,
                        }}
                    />
                </div>
                <div className="row-start-4 lg:col-start-2 lg:row-start-2 lg:row-span-3">
                    <Suspense fallback={<LoadingSpinner />}>
                        <ProjectsPagination
                            query={query}
                            order={order}
                            pageSize={pageSize}
                            page={page}
                            categories={categories}
                            tags={tags}
                            userId={userId}
                            layout={layout}
                            href="/dashboard/projects"
                        />
                    </Suspense>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
