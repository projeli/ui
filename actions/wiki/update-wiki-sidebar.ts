"use server";

import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { WikiSidebar } from "@/lib/types/wiki-types";

export const updateWikiSidebarAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const id = formData.get("id") as string;
    const sidebar = JSON.parse(
        formData.get("sidebar") as string
    ) as WikiSidebar;

    const response = await wikiApi.updateSidebar(id, sidebar);

    if (response.success) {
        return {
            success: true,
            message: "Wiki sidebar updated successfully",
        };
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
