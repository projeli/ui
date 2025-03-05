"use server";

import { wikiCategoryApi } from "@/lib/api/wiki/wiki-category-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { redirect } from "next/navigation";

export const createWikiCategoryAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    console.log("formData", formData);

    const response = await wikiCategoryApi.create(
        formData.get("wikiId") as string,
        {
            name: formData.get("name") as string,
            slug: formData.get("slug") as string,
            description: formData.get("description") as string,
        }
    );

    console.log(response);

    if (response.success) {
        throw redirect(
            `/dashboard/projects/${formData.get("projectSlug")}/wiki/categories`
        );
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
