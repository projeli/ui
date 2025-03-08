"use server";

import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const createWikiPageAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const slug = formData.get("slug") as string;

    const response = await wikiPageApi.create(
        formData.get("wikiId") as string,
        {
            title: formData.get("title") as string,
            slug,
        }
    );

    if (response.success) {
        throw redirect(
            `/dashboard/projects/${formData.get(
                "projectSlug"
            )}/wiki/pages/${slug}`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
