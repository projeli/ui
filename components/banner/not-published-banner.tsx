import { Rocket } from "lucide-react";
import Anchor from "../navigation/anchor";
import { Card } from "../ui/card";

type NotPublishedBannerProps = {
    predicate: boolean;
    title: string;
    href?: string;
    buttonLabel?: string;
    size?: "sm" | "default";
};

const NotPublishedBanner = ({
    predicate,
    title,
    href,
    buttonLabel,
    size = "default",
}: NotPublishedBannerProps) => {
    if (!predicate) return null;

    if (size === "sm") {
        return (
            <div className="bg-destructive text-destructive-foreground px-6 py-2 text-xs font-semibold">
                {title}
            </div>
        );
    }

    return (
        <Card className="px-6 py-4 bg-destructive flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <p className="text-sm text-destructive-foreground">{title}</p>
            {href && (
                <Anchor href={href} variant="outline">
                    <Rocket />
                    {buttonLabel}
                </Anchor>
            )}
        </Card>
    );
};

export default NotPublishedBanner;
