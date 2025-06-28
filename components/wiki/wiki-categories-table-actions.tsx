"use client";

import {
    WikiCategory,
    WikiMember,
    WikiMemberPermissions,
} from "@/lib/types/wiki-types";
import { hasWikiPermission } from "@/lib/utils";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import WikiDeleteCategoryDialog from "./wiki-delete-category-dialog";
import WikiUpdateCategoryDialog from "./wiki-update-category-dialog";

type WikiCategoriesTableActionsProps = {
    wikiId: string;
    projectSlug: string;
    category: WikiCategory;
    member: WikiMember;
};

const WikiCategoriesTableActions = ({
    wikiId,
    projectSlug,
    category,
    member,
}: WikiCategoriesTableActionsProps) => {
    const [dialogUpdateOpen, setDialogUpdateOpen] = useState(false);
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);

    const canEdit = hasWikiPermission(
        member,
        WikiMemberPermissions.EditWikiCategories
    );
    const canDelete = hasWikiPermission(
        member,
        WikiMemberPermissions.DeleteWikiCategories
    );

    if (!canEdit && !canDelete) {
        return null;
    }

    return (
        <>
            <div className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {canEdit && (
                            <DropdownMenuItem
                                onSelect={() => setDialogUpdateOpen(true)}
                            >
                                <Edit />
                                Edit Category
                            </DropdownMenuItem>
                        )}
                        {canEdit && canDelete && <DropdownMenuSeparator />}
                        {canDelete && (
                            <DropdownMenuItem
                                onSelect={() => setDialogDeleteOpen(true)}
                                className="text-destructive"
                            >
                                <Trash />
                                Delete Category
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <WikiUpdateCategoryDialog
                projectSlug={projectSlug}
                wikiId={wikiId}
                category={category}
                open={dialogUpdateOpen}
                onOpenChange={setDialogUpdateOpen}
            />
            <WikiDeleteCategoryDialog
                wikiId={wikiId}
                projectSlug={projectSlug}
                category={category}
                open={dialogDeleteOpen}
                onOpenChange={setDialogDeleteOpen}
            />
        </>
    );
};

export default WikiCategoriesTableActions;
