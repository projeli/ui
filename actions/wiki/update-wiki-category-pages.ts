"use server";

import { wikiCategoryApi } from "@/lib/api/wiki/wiki-category-api";
import { FormState, ServerAction } from "@/lib/types/form-types";

export const updateWikiCategoryPagesAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await wikiCategoryApi.updatePages(
        formData.get("wikiId") as string,
        formData.get("id") as string,
        formData.getAll("pages") as string[]
    );

    if (response.success) {
        return {
            success: true,
            message: "Pages updated successfully.",
            errors: {},
        };
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
