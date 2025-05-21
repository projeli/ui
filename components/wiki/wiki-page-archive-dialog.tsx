"use client";

import { updateWikiPageStatusAction } from "@/actions/wiki/update-wiki-page-status";
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

type WikiPageArchiveDialogProps = {
    page: WikiPage;
    project: Project;
    wikiId: string;
};

const WikiPageArchiveDialog = ({
    page,
    project,
    wikiId,
}: WikiPageArchiveDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateWikiPageStatusAction,
        {}
    );

    const handleArchive = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("projectSlug", project.slug);
            formData.append("wikiId", wikiId);
            formData.append("id", page.id);
            formData.append("status", "Archived");
            formAction(formData);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    <Trash />
                    Archive Page
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm border-destructive">
                <FormAlert formState={formState} />
                <DialogHeader>
                    <DialogTitle>Archive Page</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to archive the page for the{" "}
                        {project.name} wiki?
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
                        onClick={handleArchive}
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

export default WikiPageArchiveDialog;
