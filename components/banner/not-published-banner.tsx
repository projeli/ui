import { cn } from "@/lib/utils";
import { Rocket } from "lucide-react";
import Anchor from "../navigation/anchor";
import { Card } from "../ui/card";

type NotPublishedBannerProps = {
    predicate: boolean;
    title: string;
    href?: string;
    button?: React.ReactNode;
    buttonLabel?: string;
    size?: "sm" | "default";
    className?: string;
};

const NotPublishedBanner = ({
    predicate,
    title,
    href,
    button,
    buttonLabel,
    size = "default",
    className,
}: NotPublishedBannerProps) => {
    if (!predicate) return null;

    if (size === "sm") {
        return (
            <div
                className={cn(
                    "bg-destructive text-destructive-foreground px-6 py-2 text-xs font-semibold h-max",
                    className
                )}
            >
                {title}
            </div>
        );
    }

    return (
        <Card
            className={cn(
                "px-6 py-4 bg-destructive flex flex-col sm:flex-row justify-between sm:items-center gap-4 h-max",
                className
            )}
        >
            <p className="text-sm text-destructive-foreground">{title}</p>
            {href && (
                <Anchor href={href} variant="outline">
                    <Rocket />
                    {buttonLabel}
                </Anchor>
            )}
            {button && <div>{button}</div>}
        </Card>
    );
};

export default NotPublishedBanner;
