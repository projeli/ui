"use client";

import { createWikiCategoryAction } from "@/actions/wiki/create-wiki-category";
import { Plus } from "lucide-react";
import { z } from "zod";
import SmartForm from "../form/smart-form";

type WikiCreateCategoryFormProps = {
    projectSlug: string;
    wikiId: string;
};

const WikiCreateCategoryForm = ({
    projectSlug,
    wikiId,
}: WikiCreateCategoryFormProps) => {
    return (
        <SmartForm
            action={createWikiCategoryAction}
            formSchema={z.object({
                projectSlug: z.string(),
                wikiId: z.string(),
                name: z.string().min(3).max(32),
                slug: z.string().min(3).max(32),
                description: z.string(),
            })}
            defaultValues={{
                projectSlug,
                wikiId,
                name: "",
                slug: "",
                description: "",
            }}
            inputs={[
                {
                    name: "projectSlug",
                    label: "Project Slug",
                    type: "hidden",
                },
                {
                    name: "wikiId",
                    label: "Wiki ID",
                    type: "hidden",
                },
                {
                    name: "name",
                    label: "Name",
                    type: "text",
                },
                {
                    name: "slug",
                    label: "URL",
                    type: "prefixed_text",
                    prefix: `${projectSlug}/wiki/categories/`,
                },
                {
                    name: "description",
                    label: "Description",
                    type: "textarea",
                },
            ]}
            submitButton={{
                icon: <Plus />,
                label: "Create Category",
            }}
        />
    );
};

export default WikiCreateCategoryForm;
