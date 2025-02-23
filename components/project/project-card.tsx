import { Project } from "@/lib/types/project-types";
import Link from "next/link";
import { Card } from "../ui/card";
import ProjectImage from "./project-image";
import ProjectTags from "./project-tags";

type ProjectCardProps = {
    project: Project;
    layout: "grid" | "list";
};

const ProjectCard = ({ project, layout }: ProjectCardProps) => {
    if (layout === "grid") {
        return (
            <Card className="flex flex-col overflow-hidden justify-between">
                <div className="p-6 flex flex-col gap-2">
                    <div className="grid grid-cols-[96px,minmax(0,1fr)] gap-2">
                        <ProjectImage project={project} />
                        <Link href={`/projects/${project.slug}`}>
                            <h3 className="text-xl font-semibold hover:underline break-words">
                                {project.name}
                            </h3>
                        </Link>
                    </div>
                    <div>
                        <p className="text-sm opacity-80">{project.summary}</p>
                    </div>
                    <ProjectTags project={project} />
                </div>
                {!project.isPublished && (
                    <div className="bg-destructive text-destructive-foreground px-6 py-2 text-xs font-semibold">
                        Only visible to members (unpublished)
                    </div>
                )}
            </Card>
        );
    }

    // List layout
    return (
        <Card className="flex flex-col overflow-hidden">
            <div className="flex p-4 gap-4">
                <ProjectImage project={project} />
                <div className="flex-1 flex flex-col gap-2">
                    <Link href={`/projects/${project.slug}`}>
                        <h3 className="text-xl font-semibold hover:underline break-words">
                            {project.name}
                        </h3>
                    </Link>
                    <p className="text-sm opacity-80 line-clamp-2">
                        {project.summary}
                    </p>
                    <ProjectTags project={project} />
                </div>
            </div>
            {!project.isPublished && (
                <div className="bg-destructive text-destructive-foreground px-4 py-2 text-xs font-semibold">
                    Only visible to members (unpublished)
                </div>
            )}
        </Card>
    );
};

export default ProjectCard;
