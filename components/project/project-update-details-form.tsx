"use client";

import { updateProjectDetailsAction } from "@/actions/project/update-project-details";
import { Project, projectCategories } from "@/lib/types/project-types";
import { Save } from "lucide-react";
import { z } from "zod";
import SmartForm from "../form/smart-form";

type ProjectUpdateDetailsFormProps = {
    project: Project;
};

const ProjectUpdateDetailsForm = ({
    project,
}: ProjectUpdateDetailsFormProps) => {
    return (
        <SmartForm
            action={updateProjectDetailsAction}
            formSchema={z.object({
                id: z.string(),
                name: z.string().min(3).max(32),
                slug: z.string().min(3).max(32),
                summary: z.string().min(32).max(128),
                category: z
                    .string()
                    .refine((value) => projectCategories.includes(value)),
            })}
            defaultValues={{
                id: project.id,
                name: project.name,
                slug: project.slug,
                summary: project.summary,
                category: project.category,
            }}
            inputs={[
                {
                    name: "name",
                    label: "Name",
                    type: "text",
                    className: "max-w-sm",
                },
                {
                    name: "slug",
                    label: "URL",
                    type: "prefixed_text",
                    prefix: "Projeli.com/projects/",
                    className: "max-w-sm",
                },
                {
                    name: "summary",
                    label: "Summary",
                    type: "textarea",
                    className: "max-w-sm",
                },
                {
                    name: "category",
                    label: "Category",
                    type: "select",
                    className: "max-w-sm",
                    options: projectCategories.map((category) => ({
                        value: category,
                        label: category,
                    })),
                },
            ]}
            submitButton={{
                icon: <Save />,
                label: "Save Changes",
            }}
        />
    );
};

export default ProjectUpdateDetailsForm;
