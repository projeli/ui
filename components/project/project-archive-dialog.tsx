"use client";

import { updateProjectStatusAction } from "@/actions/project/update-project-status";
import { Project } from "@/lib/types/project-types";
import { Archive, X } from "lucide-react";
import { startTransition, useActionState } from "react";
import FormAlert from "../form/form-alert";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

type ProjectArchiveDialogProps = {
    project: Project;
};

const ProjectArchiveDialog = ({ project }: ProjectArchiveDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateProjectStatusAction,
        {}
    );

    const handleDelete = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("id", project.id);
            formData.append("status", "Archived");
            formAction(formData);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    <Archive />
                    Archive Project
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm border-destructive">
                <FormAlert formState={formState} />
                <DialogHeader>
                    <DialogTitle>Archive Project</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to archive the {project.name}{" "}
                        project?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className="grow"
                            loading={isLoading}
                            icon={<X />}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleDelete}
                        type="submit"
                        variant="destructive"
                        className="grow"
                        loading={isLoading}
                        icon={<Archive />}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectArchiveDialog;
