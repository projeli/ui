"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { Boxes, Gauge, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const CustomUserButton = () => {
    const [done, setDone] = useState(false);
    const { isSignedIn } = useAuth();

    useEffect(() => {
        if (isSignedIn) {
            setTimeout(() => {
                setDone(true);
            }, 50);
        }
    }, [isSignedIn]);

    if (!done) return <Skeleton className="h-8 w-8 rounded-full" />;

    return (
        <UserButton
            appearance={{
                elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-full",
                },
            }}
        >
            <UserButton.MenuItems>
                <UserButton.Link
                    label="Dashboard"
                    href="/dashboard"
                    labelIcon={<Gauge className="w-4 h-4" />}
                />
                <UserButton.Link
                    label="My Projects"
                    href="/dashboard/projects"
                    labelIcon={<Boxes className="w-4 h-4" />}
                />
                <UserButton.Link
                    label="My Wikis"
                    href="/dashboard/wikis"
                    labelIcon={<Newspaper className="w-4 h-4" />}
                />
            </UserButton.MenuItems>
        </UserButton>
    );
};

export default CustomUserButton;
