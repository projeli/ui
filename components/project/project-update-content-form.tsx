"use client";

import { updateProjectContentAction } from "@/actions/project/update-project-content";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/lib/types/project-types";
import { createFormToast } from "@/lib/utils";
import { debounce } from "lodash";
import { Save } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import MarkdownEditor from "../markdown/markdown-editor";
import { Button } from "../ui/button";

type ProjectContentFormProps = {
    project: Project;
};

const ProjectUpdateDescriptionForm = ({ project }: ProjectContentFormProps) => {
    const { toast } = useToast();
    const [formState, formAction, isLoading] = useActionState(
        updateProjectContentAction,
        {}
    );

    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const debouncedSubmit = debounce(() => {
        submitBtnRef.current?.click();
    }, 1000);

    useEffect(() => {
        createFormToast(toast, formState, "Description updated successfully.");
    }, [formState, toast]);

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
        <div className="grid gap-4 h-full">
            <form
                action={formAction}
                className="grid grid-rows-[minmax(0,1fr)_max-content] gap-4"
            >
                <input type="hidden" name="id" value={project.id} />
                <div className="border border-border rounded-lg overflow-hidden">
                    <MarkdownEditor content={project.content} />
                </div>
                <div>
                    <Button
                        variant="default"
                        ref={submitBtnRef}
                        loading={isLoading}
                        icon={<Save />}
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProjectUpdateDescriptionForm;
