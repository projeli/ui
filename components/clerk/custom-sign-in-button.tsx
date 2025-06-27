import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

type CustomSignInButtonProps = {
    label?: string;
    icon?: React.ReactNode;
    variant?: ButtonProps["variant"];
    mode?: "modal" | "redirect";
};

const CustomSignInButton = ({
    label = "Sign In",
    icon,
    variant = "default",
    mode = "modal",
}: CustomSignInButtonProps) => {
    return (
        <Button asChild className="cursor-pointer" variant={variant}>
            <SignInButton mode={mode}>
                <div>
                    {icon || <LogIn className="h-6 w-6" />}
                    {label}
                </div>
            </SignInButton>
        </Button>
    );
};

export default CustomSignInButton;
