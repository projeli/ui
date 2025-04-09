"use server";

import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
import { FormState, ServerAction } from "@/lib/types/form-types";

export const updateWikiPageCategoriesAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await wikiPageApi.updateCategories(
        formData.get("wikiId") as string,
        formData.get("id") as string,
        formData.getAll("categories") as string[]
    );

    if (response.success) {
        return {
            success: true,
            message: "Categories updated successfully",
            errors: {},
        };
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
