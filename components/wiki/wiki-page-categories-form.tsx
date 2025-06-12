"use client";

import { updateWikiPageCategoriesAction } from "@/actions/wiki/update-wiki-page-categories";
import { useToast } from "@/hooks/use-toast";
import { WikiCategory, WikiPage } from "@/lib/types/wiki-types";
import { createFormToast } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

type WikiPageCategoriesFormProps = {
    wikiId: string;
    page: WikiPage;
    categories: WikiCategory[];
};

const ITEMS_PER_PAGE = 10;

const WikiPageCategoriesForm = ({
    wikiId,
    page,
    categories,
}: WikiPageCategoriesFormProps) => {
    const { toast } = useToast();
    const [formState, formAction, isLoading] = useActionState(
        updateWikiPageCategoriesAction,
        {}
    );

    const [selectedCategories, setSelectedCategories] = useState<
        WikiCategory[]
    >(page.categories);
    const [availableCategories, setAvailableCategories] =
        useState<WikiCategory[]>(categories.filter(
            (category) => !page.categories.some((c) => c.id === category.id)
        ));

    // Pagination states
    const [selectedCategoriesPage, setSelectedCategoriesPage] =
        useState<number>(1);
    const [availableCategoriesPage, setAvailableCategoriesPage] =
        useState<number>(1);

    // Search states
    const [globalQuery, setGlobalQuery] = useState<string>("");
    const [selectedQuery, setSelectedQuery] = useState<string>("");
    const [availableQuery, setAvailableQuery] = useState<string>("");

    // Filter functions
    const filterCategories = (categories: WikiCategory[], query: string) =>
        categories.filter((category) =>
            category.name.toLowerCase().includes(query.toLowerCase())
        );

    // Selected Categories pagination
    const filteredSelected = filterCategories(
        selectedCategories,
        selectedQuery || globalQuery
    );
    const selectedTotalPages = Math.ceil(
        filteredSelected.length / ITEMS_PER_PAGE
    );
    const selectedStart = (selectedCategoriesPage - 1) * ITEMS_PER_PAGE;
    const selectedEnd = selectedStart + ITEMS_PER_PAGE;
    const paginatedSelected = filteredSelected.slice(
        selectedStart,
        selectedEnd
    );

    // Available Categories pagination
    const filteredAvailable = filterCategories(
        availableCategories,
        availableQuery || globalQuery
    );
    const availableTotalPages = Math.ceil(
        filteredAvailable.length / ITEMS_PER_PAGE
    );
    const availableStart = (availableCategoriesPage - 1) * ITEMS_PER_PAGE;
    const availableEnd = availableStart + ITEMS_PER_PAGE;
    const paginatedAvailable = filteredAvailable.slice(
        availableStart,
        availableEnd
    );

    // Pagination handlers
    const handleSelectedPrevious = () => {
        if (selectedCategoriesPage > 1)
            setSelectedCategoriesPage(selectedCategoriesPage - 1);
    };
    const handleSelectedNext = () => {
        if (selectedCategoriesPage < selectedTotalPages)
            setSelectedCategoriesPage(selectedCategoriesPage + 1);
    };
    const handleAvailablePrevious = () => {
        if (availableCategoriesPage > 1)
            setAvailableCategoriesPage(availableCategoriesPage - 1);
    };
    const handleAvailableNext = () => {
        if (availableCategoriesPage < availableTotalPages)
            setAvailableCategoriesPage(availableCategoriesPage + 1);
    };

    const handleSave = () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("wikiId", wikiId);
            formData.append("id", page.id);
            selectedCategories.forEach((category) =>
                formData.append("categories", category.id)
            );
            formAction(formData);
        });
    };

    useEffect(() => {
        createFormToast(toast, formState, "Categories updated successfully.");
    }, [formState, toast]);

    return (
        <div>
            <div className="grid gap-4">
                <div className="grid sm:flex gap-4">
                    <Input
                        value={globalQuery}
                        onChange={(e) => {
                            setGlobalQuery(e.target.value);
                            setSelectedCategoriesPage(1);
                            setAvailableCategoriesPage(1);
                        }}
                        placeholder="Search all categories..."
                        className="w-full"
                    />
                    <Button
                        onClick={handleSave}
                        loading={isLoading}
                        icon={<Save />}
                    >
                        Save Changes
                    </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="grid p-6 gap-4 h-max">
                        <div className="grid gap-4 pb-4 border-b">
                            <h2 className="text-lg font-semibold">
                                Selected Categories
                            </h2>
                            <Input
                                value={selectedQuery}
                                onChange={(e) => {
                                    setSelectedQuery(e.target.value);
                                    setSelectedCategoriesPage(1);
                                }}
                                placeholder="Search selected..."
                                disabled={!!globalQuery}
                            />
                        </div>
                        <div className="grid gap-2">
                            {paginatedSelected.length === 0 ? (
                                <p className="text-muted-foreground">
                                    {selectedQuery || globalQuery
                                        ? "No matching categories found"
                                        : "No categories selected"}
                                </p>
                            ) : (
                                paginatedSelected.map((category) => (
                                    <Button
                                        key={category.id}
                                        className="justify-start text-base px-4 py-2"
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedCategories(
                                                selectedCategories.filter(
                                                    (c) => c.id !== category.id
                                                )
                                            );
                                            setAvailableCategories([
                                                ...availableCategories,
                                                category,
                                            ]);
                                        }}
                                    >
                                        <ArrowRight className="mr-2" />
                                        <p>{category.name}</p>
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
                                    disabled={selectedCategoriesPage === 1}
                                >
                                    Previous
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    Page {selectedCategoriesPage} of{" "}
                                    {selectedTotalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectedNext}
                                    disabled={
                                        selectedCategoriesPage ===
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
                                Available Categories
                            </h2>
                            <Input
                                value={availableQuery}
                                onChange={(e) => {
                                    setAvailableQuery(e.target.value);
                                    setAvailableCategoriesPage(1);
                                }}
                                placeholder="Search available..."
                                disabled={!!globalQuery}
                            />
                        </div>
                        <div className="grid gap-2">
                            {paginatedAvailable.length === 0 ? (
                                <p className="text-muted-foreground">
                                    {availableQuery || globalQuery
                                        ? "No matching categories found"
                                        : "No categories available"}
                                </p>
                            ) : (
                                paginatedAvailable.map((category) => (
                                    <Button
                                        key={category.id}
                                        className="justify-start text-base px-4 py-2"
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedCategories([
                                                ...selectedCategories,
                                                category,
                                            ]);
                                            setAvailableCategories(
                                                availableCategories.filter(
                                                    (c) => c.id !== category.id
                                                )
                                            );
                                        }}
                                    >
                                        <ArrowLeft className="mr-2" />
                                        <p>{category.name}</p>
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
                                    disabled={availableCategoriesPage === 1}
                                >
                                    Previous
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    Page {availableCategoriesPage} of{" "}
                                    {availableTotalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAvailableNext}
                                    disabled={
                                        availableCategoriesPage ===
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

export default WikiPageCategoriesForm;
