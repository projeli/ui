"use server";

import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const updateWikiPageStatusAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const wikiId = formData.get("wikiId") as string;
    const id = formData.get("id") as string;

    const existingPage = await wikiPageApi.getById(wikiId, id);

    if (!existingPage) {
        return {
            success: false,
            message: "Page not found",
            errors: {},
        };
    }

    const response = await wikiPageApi.updateStatus(
        wikiId,
        id,
        formData.get("status") as string
    );

    if (response.success) {
        throw redirect(
            `/dashboard/projects/${
                formData.get("projectSlug") as string
            }/wiki/pages/${existingPage.slug}`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
