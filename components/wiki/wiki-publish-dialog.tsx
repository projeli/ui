"use client";

import { updateWikiPageStatusAction } from "@/actions/wiki/update-wiki-page-status";
import { Project } from "@/lib/types/project-types";
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
import LoadingSpinner from "../ui/loading-spinner";
import { updateWikiStatusAction } from "@/actions/wiki/update-wiki-status";

type WikiPublishDialogProps = {
    wiki: Wiki;
    project: Project;
};

const WikiPublishDialog = ({
    wiki,
    project,
}: WikiPublishDialogProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateWikiStatusAction,
        {}
    );

    const handlePublish = async () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("id", wiki.id);
            formData.append("status", "Published");
            formAction(formData);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Rocket />
                    Publish Wiki
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <FormAlert formState={formState} />
                <DialogHeader>
                    <DialogTitle>Publish Wiki</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to publish wiki for the{" "}
                        {project.name} project?
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

export default WikiPublishDialog;
