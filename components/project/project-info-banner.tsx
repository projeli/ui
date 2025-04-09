import { Project } from "@/lib/types/project-types";
import NotPublishedBanner from "../banner/not-published-banner";
import ProjectPublishDialog from "./project-publish-dialog";

type ProjectInfoBannerProps = {
    project: Project;
};

const ProjectInfoBanner = ({ project }: ProjectInfoBannerProps) => {
    if (project.status === "Draft") {
        return (
            <NotPublishedBanner
                predicate={project.status === "Draft"}
                title="This project is not published and can only be viewed by its members."
                button={<ProjectPublishDialog project={project} />}
            />
        );
    }

    if (project.status === "Archived") {
        return (
            <NotPublishedBanner
                predicate={project.status === "Archived"}
                title="This project has been archived and is no longer visible to users."
                button={<ProjectPublishDialog project={project} />}
            />
        );
    }

    return null;
};

export default ProjectInfoBanner;
