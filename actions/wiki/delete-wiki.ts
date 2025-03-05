"use server";

import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const deleteWikiAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await wikiApi.delete(
        formData.get("id") as string
    );

    if (response.success) {
        throw redirect(
            `/dashboard/projects/${response.data?.projectSlug}`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
