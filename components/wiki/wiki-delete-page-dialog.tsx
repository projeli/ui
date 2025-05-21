"use client";

import { deleteWikiPageAction } from "@/actions/wiki/delete-wiki-page";
import { Project } from "@/lib/types/project-types";
import { WikiPage } from "@/lib/types/wiki-types";
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

type WikiDeletePageDialogProps = {
    page: WikiPage;
    project: Project;
    wikiId: string;
};

const WikiDeletePageDialog = ({
    page,
    project,
    wikiId,
}: WikiDeletePageDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        deleteWikiPageAction,
        {}
    );

    const handleDelete = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("projectSlug", project.slug);
            formData.append("wikiId", wikiId);
            formData.append("id", page.id);
            formAction(formData);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    <Trash />
                    Delete Page
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm border-destructive">
                <FormAlert formState={formState} />
                <DialogHeader>
                    <DialogTitle>Delete Page</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the page for{" "}
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

export default WikiDeletePageDialog;
