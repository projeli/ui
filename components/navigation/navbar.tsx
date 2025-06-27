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
import { auth } from "@clerk/nextjs/server";
import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import {
    BadgePlus,
    Boxes,
    CalendarSync,
    ChevronDown,
    Menu,
} from "lucide-react";
import React from "react";
import CustomSignInButton from "../clerk/custom-sign-in-button";
import CustomUserButton from "../clerk/custom-user-button";
import Logo from "../images/logo";
import NotificationButton from "../notification/notification-button";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";

const links: {
    label: string;
    defaultOpen?: boolean;
    subLinks?: {
        label: string;
        path: string;
        icon: React.ReactNode;
    }[];
}[] = [
    {
        label: "Browse",
        defaultOpen: true,
        subLinks: [
            {
                label: "All Projects",
                path: "/projects",
                icon: <Boxes className="w-5 h-5" />,
            },
            {
                label: "Updated Projects",
                path: "/projects?order=updated",
                icon: <CalendarSync className="w-5 h-5" />,
            },
            {
                label: "New Projects",
                path: "/projects?order=published",
                icon: <BadgePlus className="w-5 h-5" />,
            },
        ],
    },
    {
        label: "Contact",
        subLinks: [
            {
                label: "GitHub",
                path: "https://github.com/projeli",
                icon: <SiGithub className="w-5 h-5" />,
            },
            {
                label: "Discord",
                path: "/discord",
                icon: <SiDiscord className="w-5 h-5" />,
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
                                <a href="/" className="h-12 w-max">
                                    <Logo />
                                </a>
                            </SheetTitle>
                            <div>
                                {links.map((link, i) => (
                                    <Collapsible
                                        key={i}
                                        defaultOpen={link.defaultOpen}
                                    >
                                        <CollapsibleTrigger className="w-full">
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-base font-semibold mt-2"
                                            >
                                                {link.label}
                                                <ChevronDown className="w-4 h-4 ml-auto" />
                                            </Button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <div className="grid gap-2 mt-2">
                                                {link.subLinks?.map(
                                                    (subLink, j) => (
                                                        <Button
                                                            key={j}
                                                            variant="ghost"
                                                            className="w-full justify-start border-l-[1px] border-l-accent pl-4 ml-4 !rounded-l-none"
                                                            asChild
                                                        >
                                                            <a
                                                                href={
                                                                    subLink.path
                                                                }
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    {
                                                                        subLink.icon
                                                                    }
                                                                    {
                                                                        subLink.label
                                                                    }
                                                                </div>
                                                            </a>
                                                        </Button>
                                                    )
                                                )}
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))}
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <a href="/" className="h-12 w-max">
                <Logo />
            </a>
            <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    {links.map((link) => (
                        <NavigationMenuItem key={link.label}>
                            <NavigationMenuTrigger>
                                <div className="text-base font-semibold">
                                    {link.label}
                                </div>
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
                {userId && <NotificationButton />}
                <ThemeToggle />
                {userId ? <CustomUserButton /> : <CustomSignInButton />}
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
