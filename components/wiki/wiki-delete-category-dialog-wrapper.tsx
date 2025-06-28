"use client";

import { WikiCategory } from "@/lib/types/wiki-types";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import WikiDeleteCategoryDialog from "./wiki-delete-category-dialog";

type WikiDeleteCategoryDialogProps = {
    projectSlug: string;
    wikiId: string;
    category: WikiCategory;
};

const WikiDeleteCategoryDialogWrapper = ({
    projectSlug,
    wikiId,
    category,
}: WikiDeleteCategoryDialogProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="destructive"
                onClick={() => setOpen(true)}
                icon={<Trash />}
            >
                Delete Category
            </Button>
            <WikiDeleteCategoryDialog
                projectSlug={projectSlug}
                wikiId={wikiId}
                category={category}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
};

export default WikiDeleteCategoryDialogWrapper;
