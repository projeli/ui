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
import WikiCreatePageForm from "./wiki-create-page-form";

type WikiCreatePageDialogProps = {
    projectSlug: string;
    wikiId: string;
};

const WikiCreatePageDialog = ({
    projectSlug,
    wikiId,
}: WikiCreatePageDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Create Page
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Page</DialogTitle>
                    <DialogDescription>
                        Create a new page by filling out the form below.
                    </DialogDescription>
                </DialogHeader>
                <WikiCreatePageForm projectSlug={projectSlug} wikiId={wikiId} />
            </DialogContent>
        </Dialog>
    );
};

export default WikiCreatePageDialog;
