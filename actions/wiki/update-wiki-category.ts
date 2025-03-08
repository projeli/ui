"use server";

import { wikiCategoryApi } from "@/lib/api/wiki/wiki-category-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const updateWikiCategoryAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await wikiCategoryApi.update(
        formData.get("wikiId") as string,
        formData.get("id") as string,
        {
            name: formData.get("name") as string,
            slug: formData.get("slug") as string,
            description: formData.get("description") as string,
        }
    );

    if (response.success) {
        throw redirect(
            `/dashboard/projects/${formData.get("projectSlug")}/wiki/categories`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
