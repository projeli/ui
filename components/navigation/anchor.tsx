import Link from "next/link";
import React from "react";
import { Button, ButtonProps } from "../ui/button";

type AnchorProps = ButtonProps & {
    href: string;
    target?: string;
};

const Anchor = React.forwardRef<HTMLButtonElement, AnchorProps>(
    (
        { children, className, variant, size, asChild = false, href, target, ...props },
        ref
    ) => {
        return (
            <Button
                asChild
                className={className}
                variant={variant}
                size={size}
                ref={ref}
                {...props}
            >
                <Link href={href} target={target}>{children}</Link>
            </Button>
        );
    }
);

export default Anchor;
