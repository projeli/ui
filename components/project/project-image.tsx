import { cn, getCdnUrl } from "@/lib/utils";
import { FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Size = "sm" | "md" | "lg";

type ProjectImageProps = {
    project: {
        name: string;
        slug: string;
        imageUrl: string;
    };
    href?: string;
    size?: Size;
};

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

const ProjectImage = ({ project, href, size = "lg" }: ProjectImageProps) => {
    return (
        <div className={cn("overflow-hidden", sizeClasses[size])}>
            {href ? (
                <Link href={`${href}/${project.slug}`}>
                    <ImageComponent project={project} size={size} />
                </Link>
            ) : (
                <ImageComponent project={project} size={size} />
            )}
        </div>
    );
};

const ImageComponent = ({
    project,
    size,
}: {
    project: {
        name: string;
        slug: string;
        imageUrl: string;
    };
    size: Size;
}) => {
    const imageUrl = getCdnUrl(project.imageUrl);

    return project.imageUrl && isValidURL(imageUrl) ? (
        <Image src={imageUrl} alt={project.name} width={96} height={96} />
    ) : (
        <div
            className={cn(
                "bg-muted flex items-center justify-center",
                sizeClasses[size]
            )}
        >
            <FileQuestion
                className={cn("text-muted-foreground", halfSizeClasses[size])}
            />
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
