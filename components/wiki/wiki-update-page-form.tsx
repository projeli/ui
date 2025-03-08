"use client";

import { updateWikiPageAction } from "@/actions/wiki/update-wiki-page";
import { WikiPage } from "@/lib/types/wiki-types";
import { Save } from "lucide-react";
import { z } from "zod";
import SmartForm from "../form/smart-form";

type WikiUpdateCategoryFormProps = {
    projectSlug: string;
    wikiId: string;
    page: WikiPage;
    redirectUrl: string;
};

const WikiUpdatePageForm = ({
    projectSlug,
    wikiId,
    page,
    redirectUrl,
}: WikiUpdateCategoryFormProps) => {
    return (
        <SmartForm
            action={updateWikiPageAction}
            formSchema={z.object({
                projectSlug: z.string(),
                wikiId: z.string(),
                redirectUrl: z.string(),
                id: z.string(),
                title: z.string().min(3).max(32),
                slug: z.string().min(3).max(32),
            })}
            defaultValues={{
                projectSlug,
                wikiId,
                redirectUrl,
                id: page.id,
                title: page.title,
                slug: page.slug,
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
                icon: <Save />,
                label: "Save Changes",
            }}
        />
    );
};

export default WikiUpdatePageForm;
