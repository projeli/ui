import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ServerAction } from "../types/form-types";

export default function useFormActionState(
    action: ServerAction,
    formSchema: any,
    defaultValues: any
) {
    type FormSchemaType = z.infer<typeof formSchema>;

    const [formState, formAction, isLoading] = useActionState(action, {});

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handleSubmit = form.handleSubmit(async (values: FormSchemaType) => {
        startTransition(() => {
            const formData = new FormData();
            for (const key in values) {
                if (Array.isArray(values[key])) {
                    formData.append(key, JSON.stringify(values[key]));
                }
                formData.append(key, values[key]);
            }
            formAction(formData);
        });
    });

    useEffect(() => {
        if (formState.errors) {
            for (const key in formState.errors) {
                form.setError(key as any, {
                    type: "server",
                    message: formState.errors[key].join(", "),
                });
            }
        }
    }, [formState]);

    return [form, handleSubmit, formState, isLoading] as const;
}
