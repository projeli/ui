"use server";

import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const updateWikiStatusAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await wikiApi.updateStatus(
        formData.get("id") as string,
        formData.get("status") as string
    );

    if (response.success) {
        throw redirect(
            `/dashboard/projects/${response.data?.projectSlug}/wiki`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
