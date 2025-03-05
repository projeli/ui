import DashboardGrid from "@/components/dashboard/dashboard-grid";
import DashboardNavigation from "@/components/dashboard/dashboard-navigation";
import PageContainer from "@/components/layout/page-container";
import { Breadcrumbs, withHome } from "@/components/notification/breadcrumbs";
import { Card } from "@/components/ui/card";

export default function Page() {
    return (
        <PageContainer className="grid gap-6 mt-8">
            <Breadcrumbs links={withHome([{ label: "Dashboard" }])} />
            <DashboardGrid>
                <div className="row-start-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 h-max">
                    <Card className="p-6">
                        <DashboardNavigation />
                    </Card>
                </div>
                <div>
                    <Card className="p-6">
                        
                    </Card>
                </div>
            </DashboardGrid>
        </PageContainer>
    );
}
