"use client";

import { Project } from "@/lib/types/project-types";
import { Rocket, X } from "lucide-react";
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
import LoadingSpinner from "../ui/loading-spinner";
import { updateProjectStatusAction } from "@/actions/project/update-project-status";

type ProjectPublishDialogProps = {
    project: Project;
};

const ProjectPublishDialog = ({ project }: ProjectPublishDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateProjectStatusAction,
        {}
    );

    const handlePublish = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("id", project.id);
            formData.append("status", "Published");
            formAction(formData);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Rocket />
                    Publish Project
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <FormAlert formState={formState} />
                <DialogHeader>
                    <DialogTitle>Publish Project</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to publish the{" "}
                        {project.name} project?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            disabled={isLoading}
                            type="button"
                            variant="outline"
                            className="grow"
                        >
                            <X />
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handlePublish}
                        disabled={isLoading}
                        type="submit"
                        variant="default"
                        className="grow"
                    >
                        {isLoading ? <LoadingSpinner /> : <Rocket />}
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectPublishDialog;
