"use client";

import { updateWikiCategoryPagesAction } from "@/actions/wiki/update-wiki-category-pages";
import { useToast } from "@/hooks/use-toast";
import {
    WikiCategory,
    WikiMember,
    WikiMemberPermissions,
    WikiPage,
} from "@/lib/types/wiki-types";
import { createFormToast, hasWikiPermission } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

type WikiCategoryPagesFormProps = {
    wikiId: string;
    category: WikiCategory;
    pages: WikiPage[];
    member: WikiMember;
};

const ITEMS_PER_PAGE = 10;

const WikiCategoryPagesForm = ({
    wikiId,
    category,
    pages,
    member,
}: WikiCategoryPagesFormProps) => {
    const { toast } = useToast();
    const [formState, formAction, isLoading] = useActionState(
        updateWikiCategoryPagesAction,
        {}
    );

    const [selectedPages, setSelectedPages] = useState<WikiPage[]>(
        category.pages
    );
    const [availablePages, setAvailablePages] = useState<WikiPage[]>(
        pages.filter((page) => !category.pages.some((c) => c.id === page.id))
    );

    // Pagination states
    const [selectedPagesCategory, setSelectedPagesCategory] =
        useState<number>(1);
    const [availablePagesCategory, setAvailablePagesCategory] =
        useState<number>(1);

    // Search states
    const [globalQuery, setGlobalQuery] = useState<string>("");
    const [selectedQuery, setSelectedQuery] = useState<string>("");
    const [availableQuery, setAvailableQuery] = useState<string>("");

    // Filter functions
    const filterPages = (pages: WikiPage[], query: string) =>
        pages.filter((page) =>
            page.title.toLowerCase().includes(query.toLowerCase())
        );

    // Selected Pages pagination
    const filteredSelected = filterPages(
        selectedPages,
        selectedQuery || globalQuery
    );
    const selectedTotalPages = Math.ceil(
        filteredSelected.length / ITEMS_PER_PAGE
    );
    const selectedStart = (selectedPagesCategory - 1) * ITEMS_PER_PAGE;
    const selectedEnd = selectedStart + ITEMS_PER_PAGE;
    const paginatedSelected = filteredSelected.slice(
        selectedStart,
        selectedEnd
    );

    // Available Pages pagination
    const filteredAvailable = filterPages(
        availablePages,
        availableQuery || globalQuery
    );
    const availableTotalPages = Math.ceil(
        filteredAvailable.length / ITEMS_PER_PAGE
    );
    const availableStart = (availablePagesCategory - 1) * ITEMS_PER_PAGE;
    const availableEnd = availableStart + ITEMS_PER_PAGE;
    const paginatedAvailable = filteredAvailable.slice(
        availableStart,
        availableEnd
    );

    // Pagination handlers
    const handleSelectedPrevious = () => {
        if (selectedPagesCategory > 1)
            setSelectedPagesCategory(selectedPagesCategory - 1);
    };
    const handleSelectedNext = () => {
        if (selectedPagesCategory < selectedTotalPages)
            setSelectedPagesCategory(selectedPagesCategory + 1);
    };
    const handleAvailablePrevious = () => {
        if (availablePagesCategory > 1)
            setAvailablePagesCategory(availablePagesCategory - 1);
    };
    const handleAvailableNext = () => {
        if (availablePagesCategory < availableTotalPages)
            setAvailablePagesCategory(availablePagesCategory + 1);
    };

    const handleSave = () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("wikiId", wikiId);
            formData.append("id", category.id);
            selectedPages.forEach((page) => formData.append("pages", page.id));
            formAction(formData);
        });
    };

    useEffect(() => {
        createFormToast(toast, formState, "Pages updated successfully.");
    }, [formState, toast]);

    const canUpdate = hasWikiPermission(
        member,
        WikiMemberPermissions.EditWikiPages
    );

    return (
        <div>
            <div className="grid gap-4">
                <div className="grid sm:flex gap-4">
                    <Input
                        value={globalQuery}
                        onChange={(e) => {
                            setGlobalQuery(e.target.value);
                            setSelectedPagesCategory(1);
                            setAvailablePagesCategory(1);
                        }}
                        placeholder="Search all pages..."
                        className="w-full"
                    />
                    {canUpdate && (
                        <Button
                            onClick={handleSave}
                            loading={isLoading}
                            icon={<Save />}
                        >
                            Save Changes
                        </Button>
                    )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="grid p-6 gap-4 h-max">
                        <div className="grid gap-4 pb-4 border-b">
                            <h2 className="text-lg font-semibold">
                                Selected Pages
                            </h2>
                            <Input
                                value={selectedQuery}
                                onChange={(e) => {
                                    setSelectedQuery(e.target.value);
                                    setSelectedPagesCategory(1);
                                }}
                                placeholder="Search selected..."
                                disabled={!!globalQuery}
                            />
                        </div>
                        <div className="grid gap-2">
                            {paginatedSelected.length === 0 ? (
                                <p className="text-muted-foreground">
                                    {selectedQuery || globalQuery
                                        ? "No matching pages found"
                                        : "No pages selected"}
                                </p>
                            ) : (
                                paginatedSelected.map((page) => (
                                    <Button
                                        key={page.id}
                                        className="justify-start text-base px-4 py-2"
                                        variant="outline"
                                        onClick={() => {
                                            if (!canUpdate) return;
                                            setSelectedPages(
                                                selectedPages.filter(
                                                    (c) => c.id !== page.id
                                                )
                                            );
                                            setAvailablePages([
                                                ...availablePages,
                                                page,
                                            ]);
                                        }}
                                    >
                                        {canUpdate && <ArrowRight />}
                                        <p className="ml-2">{page.title}</p>
                                    </Button>
                                ))
                            )}
                        </div>
                        {selectedTotalPages > 1 && (
                            <div className="flex items-center justify-between mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectedPrevious}
                                    disabled={selectedPagesCategory === 1}
                                >
                                    Previous
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    Page {selectedPagesCategory} of{" "}
                                    {selectedTotalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectedNext}
                                    disabled={
                                        selectedPagesCategory ===
                                        selectedTotalPages
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </Card>
                    <Card className="grid p-6 gap-4 h-max">
                        <div className="grid gap-4 pb-4 border-b">
                            <h2 className="text-lg font-semibold">
                                Available Pages
                            </h2>
                            <Input
                                value={availableQuery}
                                onChange={(e) => {
                                    setAvailableQuery(e.target.value);
                                    setAvailablePagesCategory(1);
                                }}
                                placeholder="Search available..."
                                disabled={!!globalQuery}
                            />
                        </div>
                        <div className="grid gap-2">
                            {paginatedAvailable.length === 0 ? (
                                <p className="text-muted-foreground">
                                    {availableQuery || globalQuery
                                        ? "No matching pages found"
                                        : "No pages available"}
                                </p>
                            ) : (
                                paginatedAvailable.map((page) => (
                                    <Button
                                        key={page.id}
                                        className="justify-start text-base px-4 py-2"
                                        variant="outline"
                                        onClick={() => {
                                            if (!canUpdate) return;
                                            setSelectedPages([
                                                ...selectedPages,
                                                page,
                                            ]);
                                            setAvailablePages(
                                                availablePages.filter(
                                                    (c) => c.id !== page.id
                                                )
                                            );
                                        }}
                                    >
                                        {canUpdate && <ArrowLeft />}
                                        <p className="ml-2">{page.title}</p>
                                    </Button>
                                ))
                            )}
                        </div>
                        {availableTotalPages > 1 && (
                            <div className="flex items-center justify-between mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAvailablePrevious}
                                    disabled={availablePagesCategory === 1}
                                >
                                    Previous
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    Page {availablePagesCategory} of{" "}
                                    {availableTotalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAvailableNext}
                                    disabled={
                                        availablePagesCategory ===
                                        availableTotalPages
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default WikiCategoryPagesForm;
