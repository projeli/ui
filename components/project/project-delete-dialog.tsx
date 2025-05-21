"use client";

import { deleteProjectAction } from "@/actions/project/delete-project";
import { Project } from "@/lib/types/project-types";
import { Trash, X } from "lucide-react";
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

type ProjectDeleteDialogProps = {
    project: Project;
};

const ProjectDeleteDialog = ({ project }: ProjectDeleteDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        deleteProjectAction,
        {}
    );

    const handleDelete = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("id", project.id);
            formAction(formData);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    <Trash />
                    Delete Project
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm border-destructive">
                <FormAlert formState={formState} />
                <DialogHeader>
                    <DialogTitle>Delete Project</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the {project.name}{" "}
                        project?
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <p className="text-base text-destructive">
                        This action is irreversible. All pages and content will
                        be lost.
                    </p>
                </div>
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
                        icon={<Trash />}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectDeleteDialog;
