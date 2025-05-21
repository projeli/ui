"use server";

import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { FormState, ServerAction } from "@/lib/types/form-types";

export const updateWikiContentAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await wikiApi.updateDescription(
        formData.get("id") as string,
        formData.get("content") as string
    );

    if (response.success) {
        return {
            success: true,
            message: "Description updated successfully.",
            errors: {},
        };
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
