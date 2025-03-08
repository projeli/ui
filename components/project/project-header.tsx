import { Project } from "@/lib/types/project-types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Anchor from "../navigation/anchor";
import ProjectImage from "./project-image";
import ProjectTags from "./project-tags";

type ProjectHeaderProps = {
    project: Project;
    button?: {
        icon: React.ReactNode;
        label: string;
        href: string;
    };
    simple?: boolean;
    href?: string;
    className?: string;
};

const ProjectHeader = ({
    project,
    button,
    simple,
    href = "/projects",
    className,
}: ProjectHeaderProps) => {
    if (simple) {
        return (
            <div
                className={cn(
                    "flex flex-col sm:flex-row justify-between items-end pb-6 border-b border-border gap-4",
                    className
                )}
            >
                <div className="grid grid-cols-[64px,minmax(0,1fr)] grid-rows-[max-content,max-content,1fr] gap-x-2 sm:gap-x-4">
                    <div className="row-span-1 sm:row-span-2">
                        <ProjectImage project={project} size="md" href={href} />
                    </div>
                    <h1 className="text-3xl font-bold hover:underline">
                        <Link href={`${href}/${project.slug}`}>
                            {project.name}
                        </Link>
                    </h1>
                    <p className="col-span-2 sm:col-span-1 text-muted-foreground line-clamp-2 sm:line-clamp-none text-sm sm:text-base">
                        {project.summary}
                    </p>
                </div>
                {button && (
                    <Anchor
                        href={button.href}
                        className="w-full sm:w-auto justify-center sm:justify-start"
                        variant="outline"
                    >
                        {button.icon}
                        {button.label}
                    </Anchor>
                )}
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col sm:flex-row justify-between items-end pb-6 border-b border-border gap-4", className)}>
            <div className="grid grid-cols-[96px,minmax(0,1fr)] grid-rows-[max-content,max-content,1fr] gap-x-2 sm:gap-x-6">
                <div className="row-span-1 sm:row-span-3">
                    <ProjectImage project={project} href={href} />
                </div>
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <div className="col-span-2 sm:col-span-1 mt-2 sm:mt-0">
                    <p className="text-muted-foreground line-clamp-2 sm:line-clamp-none text-sm sm:text-base">
                        {project.summary}
                    </p>
                </div>
                <div className="col-span-2 sm:col-span-1 mt-2 sm:mt-0">
                    <ProjectTags project={project} filterable={false} />
                </div>
            </div>
            {button && (
                <Anchor
                    href={button.href}
                    className="w-full sm:w-auto justify-center sm:justify-start"
                    variant="outline"
                >
                    {button.icon}
                    {button.label}
                </Anchor>
            )}
        </div>
    );
};

export default ProjectHeader;
