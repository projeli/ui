"use client";

import { projectCategories } from "@/lib/types/project-types";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Card } from "../ui/card";
import SearchparamsCheckbox from "../ui/searchparams-checkbox";
import ProjectCategory from "./project-category";

type ProjectCategoriesProps = React.ComponentProps<"div"> & {
    categories: string[];
};

const ProjectCategories = ({
    categories: initialCategories,
    className,
    ...props
}: ProjectCategoriesProps) => {
    const searchParams = useSearchParams();
    const [selectedCategories, setSelectedCategories] =
        useState<string[]>(initialCategories);

    useEffect(() => {
        const categoriesFromParams =
            searchParams.get("categories")?.split(",") || [];
        setSelectedCategories(categoriesFromParams);
    }, [searchParams]);

    const handleCheckboxChange = (category: string, checked: boolean) => {
        const newCategories = checked
            ? [...selectedCategories, category]
            : selectedCategories.filter((c) => c !== category);
        setSelectedCategories(newCategories);
    };

    return (
        <Card className={cn("p-6", className)} {...props}>
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="categories"
            >
                <AccordionItem value="categories" className="border-b-0">
                    <AccordionTrigger className="text-xl font-semibold p-0">
                        Categories
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-2 mt-2">
                            {projectCategories.map((category) => (
                                <SearchparamsCheckbox
                                    key={category}
                                    label={
                                        <ProjectCategory
                                            className="text-card-foreground/80"
                                            category={category}
                                        />
                                    }
                                    name="categories"
                                    value={category}
                                    checked={selectedCategories.includes(
                                        category
                                    )}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange(
                                            category,
                                            checked as boolean
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
};

export default ProjectCategories;
