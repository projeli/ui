"use client";

import { updateWikiCategoryAction } from "@/actions/wiki/update-wiki-category";
import { WikiCategory } from "@/lib/types/wiki-types";
import { Save } from "lucide-react";
import { z } from "zod";
import SmartForm from "../form/smart-form";

type WikiUpdateCategoryFormProps = {
    projectSlug: string;
    wikiId: string;
    category: WikiCategory;
    redirectUrl?: string;
};

const WikiUpdateCategoryForm = ({
    projectSlug,
    wikiId,
    category,
    redirectUrl = `/dashboard/projects/${projectSlug}/wiki/categories`,
}: WikiUpdateCategoryFormProps) => {
    return (
        <SmartForm
            action={updateWikiCategoryAction}
            formSchema={z.object({
                projectSlug: z.string(),
                wikiId: z.string(),
                redirectUrl: z.string(),
                id: z.string(),
                name: z.string().min(3).max(32),
                slug: z.string().min(3).max(32),
                description: z.string(),
            })}
            defaultValues={{
                projectSlug,
                wikiId,
                redirectUrl,
                id: category.id,
                name: category.name,
                slug: category.slug,
                description: category.description,
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
                    name: "redirectUrl",
                    label: "Redirect URL",
                    type: "hidden",
                },
                {
                    name: "id",
                    label: "ID",
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
                icon: <Save />,
                label: "Save Changes",
            }}
        />
    );
};

export default WikiUpdateCategoryForm;
