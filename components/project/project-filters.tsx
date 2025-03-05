"use client";

import { Card } from "../ui/card";
import ProjectCategories from "./project-categories";
import ProjectClearFilters from "./project-clear-filters";

type ProjectFiltersProps = {
    defaultOpen?: boolean;
};

const ProjectFilters = ({ defaultOpen = false }: ProjectFiltersProps) => {
    return (
        <Card className="p-6 grid gap-4 h-max">
            <ProjectClearFilters />
            <div>
                <h2 className="text-xl font-semibold border-b border-border pb-2">
                    Filters
                </h2>
                <div className="ml-2 mt-2">
                    <ProjectCategories
                        className="hidden lg:block"
                        defaultOpen={true}
                    />
                    <ProjectCategories
                        className="lg:hidden"
                        defaultOpen={false}
                    />
                </div>
            </div>
        </Card>
    );
};

export default ProjectFilters;
