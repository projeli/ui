"use client";

import { updateProjectTagsAction } from "@/actions/project/update-project-tags";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/lib/types/project-types";
import { createFormToast } from "@/lib/utils";
import { Save } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import LabeledTagsInput from "../ui/labeled-tags-input";

type ProjectTagsFormProps = {
    project: Project;
};

const ProjectUpdateTagsForm = ({ project }: ProjectTagsFormProps) => {
    const { toast } = useToast();
    const [formState, formAction, isLoading] = useActionState(
        updateProjectTagsAction,
        {}
    );
    const [tags, setTags] = useState<string[]>(
        project.tags.map((tag) => tag.name)
    );

    useEffect(() => {
        createFormToast(toast, formState, "Tags updated successfully.");
    }, [formState, toast]);

    return (
        <div className="grid gap-4 h-max">
            <form action={formAction} className="grid grid-cols-1 gap-4">
                <input type="hidden" name="id" value={project.id} />
                <Card className="p-6 grid gap-6">
                    <div>
                        <h2 className="text-xl font-semibold">Tags</h2>
                        <p className="text-muted-foreground text-sm">
                            Tags help you categorize and organize your projects.
                            It's a good idea to add tags that describe the
                            project's purpose, technologies used, and other
                            relevant information.
                        </p>
                        <p className="text-muted-foreground text-sm mt-2">
                            You can add up to 5 tags. Separate tags with commas,
                            spaces or using Enter.
                        </p>
                    </div>
                    <div>
                        <LabeledTagsInput
                            className="max-w-sm"
                            name="tags"
                            value={tags}
                            onValueChange={setTags}
                            maxItems={5}
                            label="Tags"
                        />
                    </div>
                    <div>
                        <Button
                            variant="default"
                            loading={isLoading}
                            icon={<Save />}
                        >
                            Save Changes
                        </Button>
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default ProjectUpdateTagsForm;
