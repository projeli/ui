import Anchor from "@/components/navigation/anchor";
import ProjectImage from "@/components/project/project-image";
import { Project } from "@/lib/types/project-types";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

type DashboardProjectHeaderProps = {
    project: Project;
    wiki?: boolean;
};

const DashboardProjectHeader = ({
    project,
    wiki,
}: DashboardProjectHeaderProps) => {
    return (
        <div className="flex flex-col gap-2 bg-muted -m-6 p-6 mb-0">
            <div className="flex gap-2 items-start">
                <ProjectImage
                    project={project}
                    size="sm"
                    href={`/projects/${project.slug}`}
                />
                <h2 className="text-lg font-semibold hover:underline">
                    <Link href={`/projects/${project.slug}`}>
                        {project.name}
                    </Link>
                </h2>
            </div>
            <div className="flex flex-wrap gap-2">
                <Anchor
                    href={`/projects/${project.slug}`}
                    variant="ghost"
                    className="bg-background justify-start grow hover:bg-primary hover:text-primary-foreground"
                >
                    <SquareArrowOutUpRight />
                    Project
                </Anchor>
                {wiki && (
                    <Anchor
                        href={`/projects/${project.slug}/wiki`}
                        variant="ghost"
                        className="bg-background justify-start grow hover:bg-primary hover:text-primary-foreground"
                    >
                        <SquareArrowOutUpRight />
                        Wiki
                    </Anchor>
                )}
            </div>
        </div>
    );
};

export default DashboardProjectHeader;
