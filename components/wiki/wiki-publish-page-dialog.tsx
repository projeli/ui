"use client";

import { updateWikiPageStatusAction } from "@/actions/wiki/update-wiki-page-status";
import { Wiki, WikiPage } from "@/lib/types/wiki-types";
import { Rocket, X } from "lucide-react";
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

type WikiPublishPageDialogProps = {
    page: WikiPage;
    wiki: Wiki;
};

const WikiPublishPageDialog = ({
    page,
    wiki,
}: WikiPublishPageDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateWikiPageStatusAction,
        {}
    );

    const handlePublish = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("projectSlug", wiki.projectSlug);
            formData.append("wikiId", wiki.id);
            formData.append("id", page.id);
            formData.append("status", "Published");
            formAction(formData);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Rocket />
                    Publish Page
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <FormAlert formState={formState} />
                <DialogHeader>
                    <DialogTitle>Publish Page</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to publish this page for the{" "}
                        {wiki.projectName} wiki?
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
                        onClick={handlePublish}
                        type="submit"
                        variant="default"
                        className="grow"
                        loading={isLoading}
                        icon={<Rocket />}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WikiPublishPageDialog;
