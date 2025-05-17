import { Project } from "@/lib/types/project-types";
import { VariantProps } from "class-variance-authority";
import { UserPlus } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import ProjectCreateMemberForm from "./project-create-member-form";

const ProjectCreateMemberDialog = ({
    project,
    variant = "default",
    buttonClass = "",
}: {
    project: Project;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    buttonClass?: string;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={variant} className={buttonClass}>
                    <UserPlus />
                    New Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Project Member</DialogTitle>
                    <DialogDescription>
                        Add a new member to the project by filling out the form
                        below.
                    </DialogDescription>
                    <div>
                        <ProjectCreateMemberForm project={project} />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectCreateMemberDialog;
