import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
    BadgePlus,
    Boxes,
    LayoutGrid,
    LogIn,
    Menu,
    Newspaper,
    TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomUserButton from "../clerk/custom-user-button";
import NotificationButton from "../notification/notification-button";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import Anchor from "./anchor";

const links: {
    label: string;
    path: string;
    subLinks?: {
        label: string;
        path: string;
        icon: React.ReactNode;
    }[];
}[] = [
    {
        label: "Projects",
        path: "/projects",
        subLinks: [
            {
                label: "All Projects",
                path: "/projects",
                icon: <Boxes className="w-5 h-5" />,
            },
            {
                label: "Popular Projects",
                path: "/projects?order=popularity",
                icon: <TrendingUp className="w-5 h-5" />,
            },
            {
                label: "New Projects",
                path: "/projects?order=new",
                icon: <BadgePlus className="w-5 h-5" />,
            },
            {
                label: "Project Categories",
                path: "/projects/categories",
                icon: <LayoutGrid className="w-5 h-5" />,
            },
        ],
    },
    {
        label: "Wikis",
        path: "/wikis",
        subLinks: [
            {
                label: "All Wikis",
                path: "/wikis",
                icon: <Newspaper className="w-5 h-5" />,
            },
            {
                label: "Popular Wikis",
                path: "/wikis?order=popularity",
                icon: <TrendingUp className="w-5 h-5" />,
            },
            {
                label: "New Wikis",
                path: "/wikis?order=new",
                icon: <BadgePlus className="w-5 h-5" />,
            },
        ],
    },
];

export async function Navbar() {
    const { userId } = await auth();

    return (
        <header className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2 md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <Menu className="h-6 w-6" />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle asChild>
                                <Logo />
                            </SheetTitle>
                            <div>
                                {links.map((link) => (
                                    <div key={link.label}>
                                        <Anchor
                                            className="w-full justify-start mt-2"
                                            variant="ghost"
                                            href={link.path}
                                        >
                                            {link.label}
                                        </Anchor>
                                        {link.subLinks?.map((subLink) => (
                                            <Anchor
                                                className="w-full justify-start border-l-[1px] border-l-accent pl-4 ml-4 !rounded-l-none"
                                                variant="ghost"
                                                href={subLink.path}
                                            >
                                                {subLink.icon}
                                                {subLink.label}
                                            </Anchor>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <Logo />
            <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    {links.map((link) => (
                        <NavigationMenuItem key={link.label}>
                            <NavigationMenuTrigger>
                                <Link
                                    href={link.path}
                                    className="text-base font-semibold"
                                >
                                    {link.label}
                                </Link>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 lg:grid-cols-[.75fr_1fr] text-nowrap">
                                    {link.subLinks?.map((subLink) => (
                                        <ListItem
                                            key={subLink.label}
                                            title={subLink.label}
                                            href={subLink.path}
                                            icon={subLink.icon}
                                        />
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-2">
                <NotificationButton />
                <ThemeToggle />
                {userId ? (
                    <CustomUserButton />
                ) : (
                    <Button asChild className="cursor-pointer">
                        <SignInButton>
                            <div>
                                <LogIn className="h-6 w-6" />
                                Sign in
                            </div>
                        </SignInButton>
                    </Button>
                )}
            </div>
        </header>
    );
}

type ListItemProps = {
    title: string;
    icon?: React.ReactNode;
    href: string;
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    ListItemProps & React.ComponentPropsWithoutRef<"a">
>(({ className, title, icon, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none flex items-center gap-2">
                        {icon}
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="/images/logo.svg"
                className="size-8"
                alt="Logo"
                width={64}
                height={64}
            />
            <span className="text-2xl font-bold">Modders</span>
        </Link>
    );
};
