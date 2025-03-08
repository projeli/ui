"use client";

import { updateProjectContentAction } from "@/actions/project/update-project-content";
import { Project } from "@/lib/types/project-types";
import { debounce } from "lodash";
import { Save } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import FormAlert from "../form/form-alert";
import MarkdownEditor from "../markdown/markdown-editor";
import { Button } from "../ui/button";
import LoadingSpinner from "../ui/loading-spinner";

type ProjectContentFormProps = {
    project: Project;
};

const ProjectUpdateDescriptionForm = ({ project }: ProjectContentFormProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateProjectContentAction,
        {}
    );

    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const debouncedSubmit = debounce(() => {
        submitBtnRef.current?.click();
    }, 1000);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault();
                if (!isLoading) {
                    debouncedSubmit();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            debouncedSubmit.cancel();
        };
    }, [isLoading]);

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

export default ProjectUpdateDescriptionForm;
