"use client";

import { cn } from "@/lib/utils";
import { Clerk } from "@clerk/clerk-js";
import { Boxes, Gauge, ShieldCheck, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Anchor from "../navigation/anchor";
import { Button } from "../ui/button";

type DashboardNavigationProps = {
    titleClassName?: string;
};

const DashboardNavigation = ({ titleClassName }: DashboardNavigationProps) => {
    const pathname = usePathname();

    const openAccountModal = async ({
        openSessions,
    }: {
        openSessions: boolean;
    }) => {
        const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
        const clerk = new Clerk(clerkPubKey as string);
        await clerk.load();
        if (openSessions) {
            clerk.openUserProfile({
                customPages: [{ label: "security" }, { label: "account" }],
            });
        } else {
            clerk.openUserProfile();
        }
    };

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
                        pathname === "/dashboard/projects"
                            ? "default"
                            : "ghost"
                    }
                >
                    <Boxes className="size-4" />
                    Projects
                </Anchor>
            </div>
            <h2 className="text-lg font-semibold mt-4">Settings</h2>
            <div className="grid gap-1">
                <Button
                    className="justify-start"
                    variant="ghost"
                    onClick={() => openAccountModal({ openSessions: false })}
                >
                    <User className="size-4" />
                    Profile
                </Button>
                <Button
                    className="justify-start"
                    variant="ghost"
                    onClick={() => openAccountModal({ openSessions: true })}
                >
                    <ShieldCheck className="size-4" />
                    Security
                </Button>
            </div>
        </div>
    );
};

export default DashboardNavigation;
