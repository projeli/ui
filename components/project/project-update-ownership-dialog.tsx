import { Project } from "@/lib/types/project-types";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import ProjectUpdateOwnershipForm from "./project-update-ownership-form";

const ProjectUpdateOwnershipDialog = ({
    project,
    button: {
        className: buttonClassName = "",
        disabled: buttonDisabled = false,
        variant: buttonVariant = "destructive",
        icon: buttonIcon,
        label: buttonLabel,
    } = {},
    dialog: {
        description: dialogDescription,
        title: dialogTitle,
        button: {
            className: dialogButtonClassName = "",
            disabled: dialogButtonDisabled = false,
            variant: dialogButtonVariant = "destructive",
            icon: dialogButtonIcon,
            label: dialogButtonLabel,
        } = {},
    } = {},
    userId,
}: {
    project: Project;
    button?: {
        className?: string;
        disabled?: boolean;
        variant?: VariantProps<typeof buttonVariants>["variant"];
        icon?: React.ReactNode;
        label?: string;
    };
    dialog?: {
        description?: string;
        title?: string;
        button?: {
            className?: string;
            disabled?: boolean;
            variant?: VariantProps<typeof buttonVariants>["variant"];
            icon?: React.ReactNode;
            label?: string;
        };
    };
    userId: string;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={buttonVariant}
                    className={buttonClassName}
                    disabled={buttonDisabled}
                >
                    {buttonIcon}
                    {buttonLabel}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                    <ProjectUpdateOwnershipForm
                        project={project}
                        userId={userId}
                        button={{
                            className: dialogButtonClassName,
                            disabled: dialogButtonDisabled,
                            variant: dialogButtonVariant,
                            icon: dialogButtonIcon,
                            label: dialogButtonLabel,
                        }}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectUpdateOwnershipDialog;
