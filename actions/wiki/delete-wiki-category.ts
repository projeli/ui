"use server";

import { wikiCategoryApi } from "@/lib/api/wiki/wiki-category-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const deleteWikiCategoryAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await wikiCategoryApi.delete(
        formData.get("wikiId") as string,
        formData.get("id") as string
    );

    if (response.success) {
        throw redirect(
            `/dashboard/projects/${formData.get("projectSlug") as string}/wiki/categories`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
