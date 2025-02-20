import { Project } from "@/lib/types/project-types";
import { FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";

type ProjectCardProps = {
    project: Project;
    layout: "grid" | "list";
};

const ProjectCard = ({ project, layout }: ProjectCardProps) => {
    if (layout === "grid") {
        return (
            <Card className="p-6 flex flex-col gap-2">
                <div className="flex gap-4">
                    <div className="size-24 rounded-lg overflow-hidden">
                        <Link href={`/projects/${project.slug}`}>
                            {project.imageUrl &&
                            isValidURL(project.imageUrl) ? (
                                <Image
                                    src={project.imageUrl}
                                    alt={project.name}
                                    width={96}
                                    height={96}
                                />
                            ) : (
                                <div className="size-24 bg-muted flex items-center justify-center">
                                    <FileQuestion className="size-12 text-muted-foreground" />
                                </div>
                            )}
                        </Link>
                    </div>
                    <Link href={`/projects/${project.slug}`}>
                        <h3 className="text-2xl font-semibold hover:underline">
                            {project.name}
                        </h3>
                    </Link>
                </div>
                <div>
                    <p className="text-sm opacity-80">{project.summary}</p>
                </div>
            </Card>
        );
    }
};

export default ProjectCard;

function isValidURL(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
