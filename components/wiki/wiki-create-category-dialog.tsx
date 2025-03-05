"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import WikiCreateCategoryForm from "./wiki-create-category-form";

type WikiCreateCategoryDialogProps = {
    projectSlug: string;
    wikiId: string;
};

const WikiCreateCategoryDialog = ({
    projectSlug,
    wikiId,
}: WikiCreateCategoryDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Create Category
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                    <DialogDescription>
                        Create a new category by filling out the form below.
                    </DialogDescription>
                </DialogHeader>
                <WikiCreateCategoryForm
                    projectSlug={projectSlug}
                    wikiId={wikiId}
                />
            </DialogContent>
        </Dialog>
    );
};

export default WikiCreateCategoryDialog;
