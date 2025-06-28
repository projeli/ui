import ProjectImage from "@/components/project/project-image";
import { Card } from "@/components/ui/card";
import { Project } from "@/lib/types/project-types";
import {
    WikiCategory,
} from "@/lib/types/wiki-types";
import Link from "next/link";

type DashboardWikiCategoryHeaderProps = {
    project: Project;
    category: WikiCategory;
};

const DashboardWikiCategoryHeader = ({
    project,
    category,
}: DashboardWikiCategoryHeaderProps) => {
    return (
        <Card className="p-6 flex gap-4 h-max">
            <ProjectImage project={project} size="md" href={"/projects"} />
            <div className="flex gap-4">
                <Link href={`/projects/${project.slug}/wiki/${category.slug}`}>
                    <h2 className="text-3xl font-bold  hover:underline">
                        {category.name}
                    </h2>
                    <p className="text-sm text-muted-foreground hover:underline">
                        {project.slug}/wiki/categories/{category.slug}
                    </p>
                </Link>
            </div>
        </Card>
    );
};

export default DashboardWikiCategoryHeader;
