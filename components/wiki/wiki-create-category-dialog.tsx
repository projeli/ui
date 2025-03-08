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
    wikiId: string;
    redirectUrl: string;
};

const WikiCreateCategoryDialog = ({
    wikiId,
    redirectUrl
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
                    wikiId={wikiId}
                    redirectUrl={redirectUrl}
                />
            </DialogContent>
        </Dialog>
    );
};

export default WikiCreateCategoryDialog;
