import HorizontalNavbar from "@/components/navigation/horizontal-navbar";
import { Cog, Menu } from "lucide-react";

type DashboardWikiSettingsNavbarProps = {
    projectSlug: string;
};

const DashboardWikiSettingsNavbar = ({
    projectSlug
}: DashboardWikiSettingsNavbarProps) => {
    return (
        <HorizontalNavbar
            links={[
                {
                    icon: <Cog />,
                    label: "General",
                    href: `/dashboard/projects/${projectSlug}/wiki/settings`,
                },
                {
                    icon: <Menu />,
                    label: "Description",
                    href: `/dashboard/projects/${projectSlug}/wiki/settings/description`,
                },
            ]}
        />
    );
};

export default DashboardWikiSettingsNavbar;
