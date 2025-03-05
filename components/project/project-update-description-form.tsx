"use client";

import { updateProjectDescriptionAction } from "@/actions/project/update-project-description";
import { Project } from "@/lib/types/project-types";
import { Save } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import FormAlert from "../form/form-alert";
import MarkdownEditor from "../markdown/markdown-editor";
import { Button } from "../ui/button";
import LoadingSpinner from "../ui/loading-spinner";
import { debounce } from "lodash"; // Add lodash import

type ProjectDescriptionFormProps = {
    project: Project;
};

const ProjectUpdateDescriptionForm = ({
    project,
}: ProjectDescriptionFormProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateProjectDescriptionAction,
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
                if (!isLoading) { // Only trigger if not already loading
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
        <div className="grid gap-4">
            <FormAlert formState={formState} />
            <form
                action={formAction}
                className="grid grid-rows-[minmax(0,1fr),max-content] gap-4"
            >
                <input type="hidden" name="id" value={project.id} />
                <div className="border border-border rounded-lg overflow-hidden">
                    <MarkdownEditor content={project.content} />
                </div>
                <div>
                    <Button variant="default" disabled={isLoading} ref={submitBtnRef}>
                        {isLoading ? <LoadingSpinner /> : <Save />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProjectUpdateDescriptionForm;