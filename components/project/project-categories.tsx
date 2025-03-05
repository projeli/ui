"use client";

import { projectCategories } from "@/lib/types/project-types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import SearchparamsCheckbox from "../ui/searchparams-checkbox";
import ProjectCategory from "./project-category";

type ProjectCategoriesProps = React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
};

const ProjectCategories = ({
    defaultOpen = false,
    ...props
}: ProjectCategoriesProps) => {
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(
        defaultOpen || !!searchParams.get("categories")
    );
    const [isFirstRender, setIsFirstRender] = useState(true);

    // Track first render
    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    const toggleCategories = () => {
        setIsOpen(!isOpen);
    };

    const variants = {
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div {...props}>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Categories</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleCategories}
                    className="flex items-center gap-2"
                >
                    {isOpen ? (
                        <>
                            Hide <ChevronUp className="h-4 w-4" />
                        </>
                    ) : (
                        <>
                            View all <ChevronDown className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={variants}
                        initial={
                            defaultOpen && isFirstRender ? "open" : "closed"
                        }
                        animate="open"
                        exit="closed"
                        className="overflow-hidden"
                    >
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
                                    checked={searchParams
                                        .getAll("categories")
                                        .includes(category)}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectCategories;
