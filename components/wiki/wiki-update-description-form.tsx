"use client";

import { updateWikiContentAction } from "@/actions/wiki/update-wiki-content";
import { Project } from "@/lib/types/project-types";
import { Wiki } from "@/lib/types/wiki-types";
import { debounce } from "lodash";
import { Save } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import FormAlert from "../form/form-alert";
import MarkdownEditor from "../markdown/markdown-editor";
import { Button } from "../ui/button";
import LoadingSpinner from "../ui/loading-spinner";

type WikiUpdateDescriptionFormProps = {
    project: Project;
    wiki: Wiki;
};

const WikiUpdateDescriptionForm = ({
    project,
    wiki,
}: WikiUpdateDescriptionFormProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateWikiContentAction,
        {}
    );

    const submitBtnRef = useRef<HTMLButtonElement>(null);

    // Debounced function to trigger form submission
    const debouncedSubmit = debounce(() => {
        submitBtnRef.current?.click();
    }, 1000); // 1000ms = 1 second debounce delay

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault();
                if (!isLoading) {
                    // Only trigger if not already loading
                    debouncedSubmit();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup: remove event listener and cancel pending debounced calls
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            debouncedSubmit.cancel();
        };
    }, [isLoading]); // Add isLoading to dependencies

    return (
        <div className="flex flex-col h-full grow">
            <FormAlert formState={formState} className="mb-4" />
            <form action={formAction} className="flex flex-col gap-4 grow">
                <input type="hidden" name="id" value={wiki.id} />
                <div className="border border-border rounded-lg overflow-hidden grow">
                    <MarkdownEditor content={wiki.content} />
                </div>
                <div>
                    <Button
                        variant="default"
                        disabled={isLoading}
                        ref={submitBtnRef}
                    >
                        {isLoading ? <LoadingSpinner /> : <Save />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default WikiUpdateDescriptionForm;
