"use client";

import { updateWikiPageContentAction } from "@/actions/wiki/update-wiki-page-content";
import { WikiPage } from "@/lib/types/wiki-types";
import { debounce } from "lodash";
import { Save } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import FormAlert from "../form/form-alert";
import MarkdownEditor from "../markdown/markdown-editor";
import { Button } from "../ui/button";
import LoadingSpinner from "../ui/loading-spinner";

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

    return (
        <div className="grid grid-rows-[max-content,1fr]">
            <div>
                <FormAlert formState={formState} className="mb-4 h-max" />
            </div>
            <form
                action={formAction}
                className="grid grid-rows-[minmax(0,1fr),max-content] gap-4"
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
                        disabled={isLoading}
                        ref={submitBtnRef}
                    >
                        {isLoading ? <LoadingSpinner /> : <Save />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default WikiUpdatePageContentForm;
