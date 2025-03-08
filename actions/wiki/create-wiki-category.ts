"use server";

import { wikiCategoryApi } from "@/lib/api/wiki/wiki-category-api";
import { FormState, ServerAction } from "@/lib/types/form-types";

export const createWikiCategoryAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await wikiCategoryApi.create(
        formData.get("wikiId") as string,
        {
            name: formData.get("name") as string,
            slug: formData.get("slug") as string,
            description: formData.get("description") as string,
        }
    );

    if (response.success) {
        return {
            success: true,
            message: "Category created successfully.",
        }
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
