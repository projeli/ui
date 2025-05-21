"use client";

import { createWikiCategoryAction } from "@/actions/wiki/create-wiki-category";
import { Plus } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";
import SmartForm from "../form/smart-form";

type WikiCreateCategoryFormProps = {
    wikiId: string;
    redirectUrl: string;
};

const WikiCreateCategoryForm = ({
    wikiId,
    redirectUrl,
}: WikiCreateCategoryFormProps) => {
    return (
        <SmartForm
            action={createWikiCategoryAction}
            onSuccess={() => {
                redirect(redirectUrl, RedirectType.push);
            }}
            formSchema={z.object({
                wikiId: z.string(),
                name: z.string().min(3).max(32),
                slug: z.string().min(3).max(32),
                description: z.string(),
            })}
            defaultValues={{
                wikiId,
                name: "",
                slug: "",
                description: "",
            }}
            inputs={[
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
                    prefix: `categories/`,
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
