import DashboardGrid from "@/components/dashboard/dashboard-grid";
import PageContainer from "@/components/layout/page-container";
import { Breadcrumbs, withHome } from "@/components/notification/breadcrumbs";
import ProjectFilters from "@/components/project/project-filters";
import ProjectSearchHeader from "@/components/project/project-search-header";
import ProjectsPagination from "@/components/project/projects-pagination";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Metadata } from "next";
import { Suspense } from "react";

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

    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs links={withHome([{ label: "Projects" }])} />
            <DashboardGrid>
                <ProjectFilters />
                <main className="grid gap-6 h-max">
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
                            newProjectButton: false,
                        }}
                    />
                    <Suspense fallback={<LoadingSpinner />}>
                        <ProjectsPagination
                            layout={layout}
                            query={query}
                            order={order}
                            pageSize={pageSize}
                            page={page}
                            categories={categories}
                            tags={tags}
                            userId=""
                            href="/projects"
                        />
                    </Suspense>
                </main>
            </DashboardGrid>
        </PageContainer>
    );
}
