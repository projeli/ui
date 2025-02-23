"use client";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clerk } from "@clerk/clerk-js";
import { Boxes, Gauge, Link as Link2, Newspaper, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const openAccountModal = async () => {
        const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
        const clerk = new Clerk(clerkPubKey as string);
        await clerk.load();
        clerk.openUserProfile();
    };

    return (
        <PageContainer>
            <div className="grid md:grid-cols-[18rem,auto] md:grid-rows-[max-content,1fr] gap-6 mt-8">
                <aside>
                    <Card className="p-6">
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                        <div className="grid">
                            <Button
                                asChild
                                className="justify-start"
                                variant={
                                    pathname === "/dashboard"
                                        ? "default"
                                        : "ghost"
                                }
                            >
                                <Link href="/dashboard">
                                    <Gauge className="size-4" />
                                    Overview
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="justify-start"
                                variant={
                                    pathname.startsWith("/dashboard/projects")
                                        ? "default"
                                        : "ghost"
                                }
                            >
                                <Link href="/dashboard/projects">
                                    <Boxes className="size-4" />
                                    Projects
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="justify-start"
                                variant={
                                    pathname.startsWith("/dashboard/settings")
                                        ? "default"
                                        : "ghost"
                                }
                            >
                                <Link href="/dashboard/settings">
                                    <Newspaper className="size-4" />
                                    Wikis
                                </Link>
                            </Button>
                        </div>
                        <h2 className="text-lg font-semibold mt-4">Settings</h2>
                        <div className="grid">
                            <Button
                                className="justify-start"
                                variant="ghost"
                                onClick={openAccountModal}
                            >
                                <User className="size-4" />
                                Account
                            </Button>
                            <Button
                                asChild
                                className="justify-start"
                                variant={
                                    pathname === "/dashboard/settings/sessions"
                                        ? "default"
                                        : "ghost"
                                }
                            >
                                <Link href="/dashboard/settings/sessions">
                                    <Link2 className="size-4" />
                                    Sessions
                                </Link>
                            </Button>
                        </div>
                    </Card>
                </aside>
                {children}
            </div>
        </PageContainer>
    );
}
