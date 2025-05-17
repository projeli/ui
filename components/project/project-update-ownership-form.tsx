"use client";

import { updateProjectOwnershipAction } from "@/actions/project/update-project-ownership";
import { Project } from "@/lib/types/project-types";
import { VariantProps } from "class-variance-authority";
import { z } from "zod";
import SmartForm from "../form/smart-form";
import { buttonVariants } from "../ui/button";

const ProjectUpdateOwnershipForm = ({
    project,
    userId,
    button: {
        className: buttonClassName = "",
        disabled: buttonDisabled = false,
        variant: buttonVariant = "destructive",
        icon: buttonIcon,
        label: buttonLabel,
    } = {},
}: {
    project: Project;
    userId: string;
    button?: {
        className?: string;
        disabled?: boolean;
        variant?: VariantProps<typeof buttonVariants>["variant"];
        icon?: React.ReactNode;
        label?: string;
    };
}) => {
    return (
        <div className="mt-4 flex flex-col items-end">
            <SmartForm
                action={updateProjectOwnershipAction}
                formSchema={z.object({
                    projectId: z.string().ulid(),
                    userId: z.string().length(32).startsWith("user_"),
                })}
                defaultValues={{
                    projectId: project.id,
                    userId: userId,
                }}
                inputs={[
                    {
                        name: "projectId",
                        label: "Project ID",
                        type: "hidden",
                    },
                    {
                        name: "userId",
                        label: "User ID",
                        type: "hidden",
                    },
                ]}
                submitButton={{
                    icon: buttonIcon,
                    label: buttonLabel ?? "",
                    variant: buttonVariant,
                    className: buttonClassName,
                    disabled: buttonDisabled,
                }}
            />
        </div>
    );
};

export default ProjectUpdateOwnershipForm;
