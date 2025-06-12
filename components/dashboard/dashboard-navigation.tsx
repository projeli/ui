"use client";

import { cn } from "@/lib/utils";
import { Bell, Boxes, Gauge } from "lucide-react";
import { usePathname } from "next/navigation";
import Anchor from "../navigation/anchor";

type DashboardNavigationProps = {
    titleClassName?: string;
};

const DashboardNavigation = ({ titleClassName }: DashboardNavigationProps) => {
    const pathname = usePathname();

    return (
        <div>
            <h1 className={cn("text-2xl font-semibold", titleClassName)}>
                Dashboard
            </h1>
            <div className="grid gap-1">
                <Anchor
                    href="/dashboard"
                    className="justify-start"
                    variant={pathname === "/dashboard" ? "default" : "ghost"}
                >
                    <Gauge className="size-4" />
                    Overview
                </Anchor>
                <Anchor
                    href="/dashboard/projects"
                    className="justify-start"
                    variant={
                        pathname === "/dashboard/projects" ? "default" : "ghost"
                    }
                >
                    <Boxes className="size-4" />
                    Projects
                </Anchor>
                <Anchor
                    href="/dashboard/notifications"
                    className="justify-start"
                    variant={
                        pathname === "/dashboard/notifications"
                            ? "default"
                            : "ghost"
                    }
                >
                    <Bell className="size-4" />
                    Notifications
                </Anchor>
            </div>
        </div>
    );
};

export default DashboardNavigation;
