"use client";

import { updateWikiPageStatusAction } from "@/actions/wiki/update-wiki-page-status";
import { Project } from "@/lib/types/project-types";
import { WikiPage } from "@/lib/types/wiki-types";
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
import LoadingSpinner from "../ui/loading-spinner";

type WikiPublishPageDialogProps = {
    page: WikiPage;
    project: Project;
    wikiId: string;
};

const WikiPublishPageDialog = ({
    page,
    project,
    wikiId,
}: WikiPublishPageDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateWikiPageStatusAction,
        {}
    );

    const handlePublish = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("projectSlug", project.slug);
            formData.append("wikiId", wikiId);
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
                        {project.name} wiki?
                    </DialogDescription>
                </DialogHeader>
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
                        onClick={handlePublish}
                        disabled={isLoading}
                        type="submit"
                        variant="default"
                        className="grow"
                    >
                        {isLoading ? <LoadingSpinner /> : <Rocket />}
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WikiPublishPageDialog;
