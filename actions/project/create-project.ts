"use server";

import { projectApi } from "@/lib/api/project/project-api";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { projectCategories } from "@/lib/types/project-types";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createProjectAction: ServerAction = async (
    currentState: FormState,
    formData: FormData
) => {
    const validationSchema = z.object({
        name: z.string().min(3).max(32),
        slug: z.string().min(3).max(32),
        summary: z.string().min(32).max(128),
        category: z
            .string()
            .refine((value) => projectCategories.includes(value)),
        image: z
            .instanceof(File)
            .refine((file) => {
                return (
                    file.size <= 2 * 1024 * 1024 &&
                    [
                        "image/png",
                        "image/jpeg",
                        "image/gif",
                        "image/webp",
                    ].includes(file.type)
                );
            }),
    });

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const summary = formData.get("summary") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    const validationResult = validationSchema.safeParse({
        name, slug, summary, category, image,
    });

    if (!validationResult.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: validationResult.error.flatten().fieldErrors,
        };
    }

    const response = await projectApi.create(
        name, slug, summary, category, image,
    );

    if (response.success) {
        throw redirect(`/dashboard/projects/${response.data?.slug}`);
    }

    return {
        success: false,
        message: response.message,
        errors: response.errors,
    };
};
