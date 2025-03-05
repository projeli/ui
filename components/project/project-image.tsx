import { Project } from "@/lib/types/project-types";
import { cn } from "@/lib/utils";
import { FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProjectImageProps = {
    project: Project;
    href: string;
    size?: "sm" | "md" | "lg";
};

const ProjectImage = ({ project, href, size = "lg" }: ProjectImageProps) => {
    const sizeClasses = {
        sm: "size-12 rounded-sm",
        md: "size-16 rounded-md",
        lg: "size-24 rounded-lg",
    };

    const halfSizeClasses = {
        sm: "size-6",
        md: "size-8",
        lg: "size-12",
    };

    return (
        <div className={cn("overflow-hidden", sizeClasses[size])}>
            <Link href={`${href}/${project.slug}`}>
                {project.imageUrl && isValidURL(project.imageUrl) ? (
                    <Image
                        src={project.imageUrl}
                        alt={project.name}
                        width={96}
                        height={96}
                    />
                ) : (
                    <div
                        className={cn(
                            "bg-muted flex items-center justify-center",
                            sizeClasses[size]
                        )}
                    >
                        <FileQuestion
                            className={cn(
                                "text-muted-foreground",
                                halfSizeClasses[size]
                            )}
                        />
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
