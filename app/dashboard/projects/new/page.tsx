"use client";

import { createProjectAction } from "@/actions/project/create-project";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LabeledCheckbox from "@/components/ui/labeled-checkbox";
import LabeledInput from "@/components/ui/labeled-input";
import LabeledSelect from "@/components/ui/labeled-select";
import LabeledTagsInput from "@/components/ui/labeled-tags-input";
import LabeledTextarea from "@/components/ui/labeled-textarea";
import { FormState } from "@/lib/types/form-types";
import { projectCategories } from "@/lib/types/project-types";
import { Loader2, Plus } from "lucide-react";
import { useActionState, useState } from "react";

export default function Page() {
    const [name, setName] = useState<string | undefined>(undefined);
    const [slug, setSlug] = useState<string | undefined>(undefined);
    const [summary, setSummary] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [tags, setTags] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [content, setContent] = useState<string | undefined>(undefined);
    const [isPublished, setIsPublished] = useState(false);

    const [formState, formAction, isLoading] = useActionState<
        FormState,
        FormData
    >(createProjectAction, {});

    return (
        <Card className="h-min p-6">
            <h1 className="text-2xl font-semibold">New project</h1>
            <p className="opacity-80">
                Create a new project by filling out the form below. You can
                always edit the project later.
            </p>
            {formState.message}
            <form action={formAction} className="grid grid-cols-1 gap-6 mt-4">
                <div className="grid lg:grid-cols-2 gap-6">
                    <LabeledInput
                        label="Name"
                        name="name"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Project name"
                        required
                        errors={formState.errors}
                    />
                    <LabeledInput
                        label="Slug"
                        name="slug"
                        defaultValue={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="project-slug"
                        required
                        errors={formState.errors}
                    />
                </div>
                <LabeledInput
                    label="Summary"
                    name="summary"
                    defaultValue={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Project summary"
                    errors={formState.errors}
                />
                <LabeledSelect
                    label="Category"
                    name="category"
                    defaultValue={category}
                    options={projectCategories}
                    onValueChange={(e) => setCategory(e)}
                    errors={formState.errors}
                    required
                />
                <LabeledTagsInput
                    value={tags}
                    onValueChange={(e) => setTags(e)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    name="tags"
                    label="Tags"
                    placeholder="Add tags"
                    maxItems={5}
                    errors={formState.errors}
                />
                <LabeledInput
                    label="Image URL"
                    name="imageUrl"
                    type="url"
                    defaultValue={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Project image URL"
                    errors={formState.errors}
                />
                <LabeledTextarea
                    label="Description"
                    name="content"
                    defaultValue={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Project description"
                    errors={formState.errors}
                />
                <div className="flex justify-between">
                    <LabeledCheckbox
                        label="Publish"
                        name="isPublished"
                        defaultChecked={isPublished}
                        onCheckedChange={(e) => setIsPublished(e as boolean)}
                        errors={formState.errors}
                    />
                    <Button type="submit">
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Plus />
                        )}
                        Create project
                    </Button>
                </div>
            </form>
        </Card>
    );
}
