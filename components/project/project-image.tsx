import { Project } from "@/lib/types/project-types";
import { FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectImage = ({ project }: { project: Project }) => {
    return (
        <div className="size-24 rounded-lg overflow-hidden">
            <Link href={`/projects/${project.slug}`}>
                {project.imageUrl && isValidURL(project.imageUrl) ? (
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
    );
};

function isValidURL(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export default ProjectImage;
