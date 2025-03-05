"use client";

import { updateProjectTagsAction } from "@/actions/project/update-project-tags";
import { Project } from "@/lib/types/project-types";
import { Save } from "lucide-react";
import { useActionState, useState } from "react";
import FormAlert from "../form/form-alert";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import LabeledTagsInput from "../ui/labeled-tags-input";
import LoadingSpinner from "../ui/loading-spinner";

type ProjectTagsFormProps = {
    project: Project;
};

const ProjectUpdateTagsForm = ({ project }: ProjectTagsFormProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateProjectTagsAction,
        {}
    );
    const [tags, setTags] = useState<string[]>(
        project.tags.map((tag) => tag.name)
    );

    return (
        <div className="grid gap-4 h-max">
            <FormAlert formState={formState} />
            <form action={formAction} className="grid grid-cols-1 gap-4">
                <input type="hidden" name="id" value={project.id} />
                <Card className="p-6 grid gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">Project Tags</h2>
                        <p className="opacity-80 text-sm">
                            Tags help you categorize and organize your projects.
                            It's a good idea to add tags that describe the
                            project's purpose, technologies used, and other
                            relevant information.
                        </p>
                        <p className="opacity-80 text-sm mt-2">
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
                        <Button variant="default" disabled={isLoading}>
                            {isLoading ? <LoadingSpinner /> : <Save />}
                            Save Changes
                        </Button>
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default ProjectUpdateTagsForm;
