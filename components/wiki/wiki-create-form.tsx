"use client";

import { updateWikiStatusAction } from "@/actions/wiki/update-wiki-status";
import { Rocket } from "lucide-react";
import { useActionState } from "react";
import FormAlert from "../form/form-alert";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

type WikiCreateFormProps = {
    projectName: string;
    wikiId: string;
};

const WikiCreateForm = ({ projectName, wikiId }: WikiCreateFormProps) => {
    const [formState, formAction, isLoading] = useActionState(
        updateWikiStatusAction,
        {}
    );

    return (
        <Card className="p-6 h-max col-span-2 max-w-sm mx-auto border-secondary lg:mt-12">
            <FormAlert formState={formState} className="mb-4" />
            <form action={formAction} className="grid gap-4">
                <input type="hidden" name="id" value={wikiId} />
                <input type="hidden" name="status" value="Draft" />
                <h2 className="text-xl font-semibold pb-4 border-b border-border">
                    Would you like to start a wiki for {projectName}?
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
                    Start a wiki for {projectName}
                </Button>
            </form>
        </Card>
    );
};

export default WikiCreateForm;
