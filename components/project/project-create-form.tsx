"use client";

import { createProjectAction } from "@/actions/project/create-project";
import { projectCategories } from "@/lib/types/project-types";
import { Plus } from "lucide-react";
import { z } from "zod";
import SmartForm from "../form/smart-form";

const ProjectCreateForm = () => {
    return (
        <SmartForm
            action={createProjectAction}
            formSchema={z.object({
                name: z.string().min(3).max(32),
                slug: z.string().min(3).max(32),
                summary: z.string().min(32).max(128),
                category: z
                    .string()
                    .refine((value) => projectCategories.includes(value)),
                image: z.instanceof(File).refine((file) => {
                    return (
                        file.size <= 2 * 1024 * 1024 &&
                        [
                            "image/png",
                            "image/jpeg",
                            "image/gif",
                            "image/webp",
                        ].includes(file.type)
                    );
                }),
            })}
            defaultValues={{
                name: "",
                slug: "",
                summary: "",
                category: "",
            }}
            inputs={[
                {
                    name: "name",
                    label: "Name",
                    type: "text",
                },
                {
                    name: "slug",
                    label: "URL",
                    type: "prefixed_text",
                    prefix: "Projeli.com/projects/",
                },
                {
                    name: "summary",
                    label: "Summary",
                    type: "textarea",
                },
                {
                    name: "category",
                    label: "Category",
                    type: "select",
                    options: projectCategories.map((category) => ({
                        label: category,
                        value: category,
                    })),
                },
                {
                    name: "image",
                    label: "Project Image",
                    type: "file",
                    accept: "image/png, image/jpeg, image/gif, image/webp",
                },
            ]}
            submitButton={{
                icon: <Plus />,
                label: "Create Project",
            }}
        />
    );
};

export default ProjectCreateForm;
