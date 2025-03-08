"use server";

import { wikiPageApi } from "@/lib/api/wiki/wiki-pages-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect, RedirectType } from "next/navigation";

export const updateWikiPageAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const wikiId = formData.get("wikiId") as string;
    const id = formData.get("id") as string;

    const existingPage = await wikiPageApi.getById(wikiId, id);

    if (!existingPage) {
        return {
            success: false,
            message: "Page not found.",
        };
    }

    const slug = formData.get("slug") as string;

    const response = await wikiPageApi.update(wikiId, id, {
        title: formData.get("title") as string,
        slug,
    });

    let redirectUrl = formData.get("redirectUrl") as string;

    if (existingPage.slug !== slug) {
        redirectUrl = redirectUrl.replace(existingPage.slug, slug);
    }

    if (response.success) {
        return redirect(redirectUrl, RedirectType.push);
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
