"use client";

import { updateWikiPageContentAction } from "@/actions/wiki/update-wiki-page-content";
import { useToast } from "@/hooks/use-toast";
import { WikiPage } from "@/lib/types/wiki-types";
import { createFormToast } from "@/lib/utils";
import { debounce } from "lodash";
import { Save } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import MarkdownEditor from "../markdown/markdown-editor";
import { Button } from "../ui/button";

type WikiUpdatePageContentFormProps = {
    pageSlug: string;
    wikiId: string;
    page: WikiPage;
};

const WikiUpdatePageContentForm = ({
    pageSlug,
    wikiId,
    page,
}: WikiUpdatePageContentFormProps) => {
    const { toast } = useToast();
    const [formState, formAction, isLoading] = useActionState(
        updateWikiPageContentAction,
        {}
    );

    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const debouncedSubmit = debounce(() => {
        submitBtnRef.current?.click();
    }, 1000);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault();
                if (!isLoading) {
                    debouncedSubmit();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            debouncedSubmit.cancel();
        };
    }, [isLoading]);

    useEffect(() => {
        createFormToast(toast, formState, "Page content updated successfully.");
    }, [formState, toast]);

    return (
        <form
            action={formAction}
            className="grid grid-rows-[minmax(0,1fr)_max-content] gap-4"
        >
            <input type="hidden" name="pageSlug" value={pageSlug} />
            <input type="hidden" name="wikiId" value={wikiId} />
            <input type="hidden" name="id" value={page.id} />
            <div className="border border-border rounded-lg overflow-hidden">
                <MarkdownEditor content={page.content} />
            </div>
            <div>
                <Button
                    variant="default"
                    ref={submitBtnRef}
                    loading={isLoading}
                    icon={<Save />}
                >
                    Save Changes
                </Button>
            </div>
        </form>
    );
};

export default WikiUpdatePageContentForm;
