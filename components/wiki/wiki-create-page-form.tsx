"use client";

import { createWikiPageAction } from "@/actions/wiki/create-wiki-page";
import { Plus } from "lucide-react";
import { z } from "zod";
import SmartForm from "../form/smart-form";

type WikiCreatePageFormProps = {
    projectSlug: string;
    wikiId: string;
};

const WikiCreatePageForm = ({
    projectSlug,
    wikiId,
}: WikiCreatePageFormProps) => {
    return (
        <SmartForm
            action={createWikiPageAction}
            formSchema={z.object({
                projectSlug: z.string(),
                wikiId: z.string(),
                title: z.string().min(3).max(64),
                slug: z
                    .string()
                    .min(3)
                    .max(64)
                    .refine((val) => val !== "categories", {
                        message: "Slug cannot be 'categories'",
                    }),
            })}
            defaultValues={{
                projectSlug,
                wikiId,
                title: "",
                slug: "",
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
                    name: "title",
                    label: "Title",
                    type: "text",
                },
                {
                    name: "slug",
                    label: "URL",
                    type: "prefixed_text",
                    prefix: `${projectSlug}/wiki/`,
                },
            ]}
            submitButton={{
                icon: <Plus />,
                label: "Create Page",
            }}
        />
    );
};

export default WikiCreatePageForm;
