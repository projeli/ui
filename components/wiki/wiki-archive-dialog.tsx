"use client";

import { updateWikiStatusAction } from "@/actions/wiki/update-wiki-status";
import { Project } from "@/lib/types/project-types";
import { Wiki } from "@/lib/types/wiki-types";
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
import LoadingSpinner from "../ui/loading-spinner";

type WikiArchiveDialogProps = {
    project: Project;
    wiki: Wiki;
};

const WikiArchiveDialog = ({ project, wiki }: WikiArchiveDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateWikiStatusAction,
        {}
    );

    const handleDelete = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("id", wiki.id);
            formData.append("status", "Archived");
            formAction(formData);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    <Archive />
                    Archive Wiki
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm border-destructive">
                <FormAlert formState={formState} />
                <DialogHeader>
                    <DialogTitle>Archive Wiki</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to archive the wiki for{" "}
                        {project.name}?
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
                        onClick={handleDelete}
                        disabled={isLoading}
                        type="submit"
                        variant="destructive"
                        className="grow"
                    >
                        {isLoading ? <LoadingSpinner /> : <Archive />}
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WikiArchiveDialog;
