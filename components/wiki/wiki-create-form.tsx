"use client";

import { createWikiAction } from "@/actions/wiki/create-wiki";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/lib/types/project-types";
import { createFormToast } from "@/lib/utils";
import { Rocket } from "lucide-react";
import { useActionState, useEffect } from "react";
import FormAlert from "../form/form-alert";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

type WikiCreateFormProps = {
    project: Project;
};

const WikiCreateForm = ({ project }: WikiCreateFormProps) => {
    const { toast } = useToast();
    const [formState, formAction, isLoading] = useActionState(
        createWikiAction,
        {}
    );

    useEffect(() => {
        createFormToast(toast, formState, "Wiki created successfully.");
    }, [formState, toast]);

    return (
        <Card className="p-6 h-max col-span-2 max-w-sm mx-auto border-secondary lg:mt-12">
            <FormAlert formState={formState} className="mb-4" />
            <form action={formAction} className="grid gap-4">
                <input type="hidden" name="projectId" value={project.id} />
                <input type="hidden" name="projectName" value={project.name} />
                <input type="hidden" name="projectSlug" value={project.slug} />
                <input type="hidden" name="status" value="Draft" />
                <h2 className="text-xl font-semibold pb-4 border-b border-border">
                    Would you like to start a wiki for {project.name}?
                </h2>
                <p className="text-base text-muted-foreground">
                    A wiki is a collection of pages that your members can edit.
                    It’s a great way to document your project.
                </p>
                <p className="text-base text-muted-foreground">
                    The wiki will show up on the left side of the project page
                    once it is published.
                </p>
                <Button
                    variant="outline"
                    className="w-full"
                    type="submit"
                    loading={isLoading}
                    icon={<Rocket />}
                >
                    Start a wiki for {project.name}
                </Button>
            </form>
        </Card>
    );
};

export default WikiCreateForm;
