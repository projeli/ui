import {
    Project,
    ProjectMember,
    ProjectMemberPermissions,
} from "@/lib/types/project-types";
import { hasProjectPermission } from "@/lib/utils";
import NotPublishedBanner from "../banner/not-published-banner";
import ProjectPublishDialog from "./project-publish-dialog";

type ProjectInfoBannerProps = {
    project: Project;
    projectMember?: ProjectMember;
};

const ProjectInfoBanner = ({
    project,
    projectMember,
}: ProjectInfoBannerProps) => {
    if (!project || !projectMember) return null;

    const hasPublishPermission = hasProjectPermission(
        projectMember,
        ProjectMemberPermissions.PublishProject
    );

    if (project.status === "Draft") {
        return (
            <NotPublishedBanner
                predicate={project.status === "Draft"}
                title="This project is not published and can only be viewed by its members."
                button={
                    hasPublishPermission ? (
                        <ProjectPublishDialog project={project} />
                    ) : null
                }
            />
        );
    }

    if (project.status === "Archived") {
        return (
            <NotPublishedBanner
                predicate={project.status === "Archived"}
                title="This project has been archived and is no longer visible to users."
                button={
                    hasPublishPermission ? (
                        <ProjectPublishDialog project={project} />
                    ) : null
                }
            />
        );
    }

    return null;
};

export default ProjectInfoBanner;
