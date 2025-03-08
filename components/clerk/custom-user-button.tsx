"use client";

import { UserButton } from "@clerk/nextjs";
import { Boxes, Gauge } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const CustomUserButton = () => {
    return (
        <UserButton
            fallback={<Skeleton className="size-8 rounded-full" />}
            appearance={{
                elements: {
                    userButtonAvatarBox: "size-8 rounded-full",
                },
            }}
        >
            <UserButton.MenuItems>
                <UserButton.Link
                    label="Dashboard"
                    href="/dashboard"
                    labelIcon={
                        <Gauge className="size-4 text-muted-foreground" />
                    }
                />
                <UserButton.Link
                    label="My Projects"
                    href="/dashboard/projects"
                    labelIcon={
                        <Boxes className="size-4 text-muted-foreground" />
                    }
                />
            </UserButton.MenuItems>
        </UserButton>
    );
};

export default CustomUserButton;
