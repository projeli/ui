"use client";

import { WikiPage } from "@/lib/types/wiki-types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import WikiUpdatePageForm from "./wiki-update-page-form";

type WikiUpdatePageDialogProps = {
    projectSlug: string;
    wikiId: string;
    page: WikiPage;
    redirectUrl: string;
    controls?: {
        open: boolean;
        onOpenChange: (open: boolean) => void;
    };
};

const WikiUpdatePageDialog = ({
    projectSlug,
    wikiId,
    page,
    redirectUrl,
    controls,
}: WikiUpdatePageDialogProps) => {
    if (!controls) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <Plus />
                        Edit Page
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Page</DialogTitle>
                        <DialogDescription>
                            Edit the page details by filling out the form below.
                        </DialogDescription>
                    </DialogHeader>
                    <WikiUpdatePageForm
                        projectSlug={projectSlug}
                        wikiId={wikiId}
                        page={page}
                        redirectUrl={redirectUrl}
                    />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={controls.open} onOpenChange={controls.onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Page</DialogTitle>
                    <DialogDescription>
                        Edit the page details by filling out the form below.
                    </DialogDescription>
                </DialogHeader>
                <WikiUpdatePageForm
                    projectSlug={projectSlug}
                    wikiId={wikiId}
                    page={page}
                    redirectUrl={redirectUrl}
                />
            </DialogContent>
        </Dialog>
    );
};

export default WikiUpdatePageDialog;
