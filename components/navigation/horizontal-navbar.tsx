"use client";

import { usePathname } from "next/navigation";
import { Card } from "../ui/card";
import Anchor from "./anchor";

type HorizontalNavbarProps = {
    links: {
        icon?: React.ReactNode;
        label: string;
        href: string;
    }[];
};

const HorizontalNavbar = ({ links }: HorizontalNavbarProps) => {
    const pathname = usePathname();

    return (
        <Card className="px-6 py-4">
            <div className="flex flex-wrap gap-4">
                {links.map((link) => (
                    <Anchor
                        key={link.label}
                        href={link.href}
                        className="justify-center"
                        variant={pathname === link.href ? "default" : "outline"}
                    >
                        {link.icon}
                        {link.label}
                    </Anchor>
                ))}
            </div>
        </Card>
    );
};

export default HorizontalNavbar;
