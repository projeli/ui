"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
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
            {/* <UserButton.MenuItems>
                    <UserButton.Action
                        label="Open chat"
                        labelIcon={<DotIcon />}
                        onClick={() => alert("init chat")}
                    />
                </UserButton.MenuItems> */}
        </UserButton>
    );
};

export default CustomUserButton;
