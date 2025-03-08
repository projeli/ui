import HorizontalNavbar from "@/components/navigation/horizontal-navbar";
import { Cog, Grid2X2, Menu } from "lucide-react";

type DashboardWikiPageNavbarProps = {
    projectSlug: string;
    pageSlug: string;
};

const DashboardWikiPageNavbar = ({
    projectSlug,
    pageSlug,
}: DashboardWikiPageNavbarProps) => {
    return (
        <HorizontalNavbar
            links={[
                {
                    icon: <Menu />,
                    label: "Description",
                    href: `/dashboard/projects/${projectSlug}/wiki/pages/${pageSlug}`,
                },
                {
                    icon: <Grid2X2 />,
                    label: "Categories",
                    href: `/dashboard/projects/${projectSlug}/wiki/pages/${pageSlug}/categories`,
                },
                {
                    icon: <Cog />,
                    label: "Settings",
                    href: `/dashboard/projects/${projectSlug}/wiki/pages/${pageSlug}/settings`,
                },
            ]}
        />
    );
};

export default DashboardWikiPageNavbar;
