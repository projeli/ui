"use server";

import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
import { FormState, ServerAction } from "@/lib/types/form-types";

export const updateWikiPageContentAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await wikiPageApi.updateContent(
        formData.get("wikiId") as string,
        formData.get("id") as string,
        formData.get("content") as string
    );

    if (response.success) {
        return {
            success: true,
            message: "Description updated successfully",
            errors: {},
        };
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
