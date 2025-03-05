"use client";

import { deleteWikiCategoryAction } from "@/actions/wiki/delete-wiki-category";
import { WikiCategory } from "@/lib/types/wiki-types";
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
} from "../ui/dialog";
import LoadingSpinner from "../ui/loading-spinner";

type WikiDeleteCategoryDialogProps = {
    projectSlug: string;
    wikiId: string;
    category: WikiCategory;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const WikiDeleteCategoryDialog = ({
    projectSlug,
    wikiId,
    category,
    open,
    onOpenChange,
}: WikiDeleteCategoryDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        deleteWikiCategoryAction,
        {}
    );

    const handleDelete = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("wikiId", wikiId);
            formData.append("id", category.id);
            formData.append("projectSlug", projectSlug);
            formAction(formData);
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm border-destructive">
                <FormAlert formState={formState} />
                <DialogHeader>
                    <DialogTitle>Delete Category</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the category{" "}
                        {category.name}?
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <p className="text-destructive">
                        This action is irreversible. The will only delete the
                        category and not the pages within it.
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

export default WikiDeleteCategoryDialog;
