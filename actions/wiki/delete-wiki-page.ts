"use server";

import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const deleteWikiPageAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const response = await wikiPageApi.delete(
        formData.get("wikiId") as string,
        formData.get("id") as string
    );

    if (response.success) {
        throw redirect(
            `/dashboard/projects/${
                formData.get("projectSlug") as string
            }/wiki/pages`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
