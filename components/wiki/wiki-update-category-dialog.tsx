"use client";

import { WikiCategory } from "@/lib/types/wiki-types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import WikiUpdateCategoryForm from "./wiki-update-category-form";

type WikiUpdateCategoryDialogProps = {
    projectSlug: string;
    wikiId: string;
    category: WikiCategory;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const WikiUpdateCategoryDialog = ({
    projectSlug,
    wikiId,
    category,
    open,
    onOpenChange,
}: WikiUpdateCategoryDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                        Edit the category by filling out the form below.
                    </DialogDescription>
                </DialogHeader>
                <WikiUpdateCategoryForm
                    projectSlug={projectSlug}
                    wikiId={wikiId}
                    category={category}
                />
            </DialogContent>
        </Dialog>
    );
};

export default WikiUpdateCategoryDialog;
