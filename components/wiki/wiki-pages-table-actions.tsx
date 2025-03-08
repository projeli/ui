import { WikiPage } from "@/lib/types/wiki-types";
import { Book, Edit, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type WikiPagesTableActionsProps = {
    projectSlug: string;
    wikiId: string;
    page: WikiPage;
};

const WikiPagesTableActions = ({
    projectSlug,
    wikiId,
    page,
}: WikiPagesTableActionsProps) => {
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
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/projects/${projectSlug}/wiki/${page.slug}`}
                            >
                                <Book />
                                View Page
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/dashboard/projects/${projectSlug}/wiki/pages/${page.slug}/settings`}
                            >
                                <Edit />
                                Edit Page
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/dashboard/projects/${projectSlug}/wiki/pages/${page.slug}/settings`}
                                className="text-destructive hover:!text-destructive"
                            >
                                <Trash />
                                Delete Page
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
};

export default WikiPagesTableActions;
