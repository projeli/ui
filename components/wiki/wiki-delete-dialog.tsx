"use client";

import { deleteWikiAction } from "@/actions/wiki/delete-wiki";
import { Project } from "@/lib/types/project-types";
import { Wiki } from "@/lib/types/wiki-types";
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
import LoadingSpinner from "../ui/loading-spinner";

type WikiDeleteDialogProps = {
    project: Project;
    wiki: Wiki;
};

const WikiDeleteDialog = ({ project, wiki }: WikiDeleteDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        deleteWikiAction,
        {}
    );

    const handleDelete = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("id", wiki.id);
            formAction(formData);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    <Trash />
                    Delete Wiki
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm border-destructive">
                <FormAlert formState={formState} />
                <DialogHeader>
                    <DialogTitle>Delete Wiki</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the wiki for{" "}
                        {project.name}?
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
                        {isLoading ? <LoadingSpinner /> : <Trash />}
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WikiDeleteDialog;
