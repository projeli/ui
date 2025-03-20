import { Project } from "@/lib/types/project-types";
import { Wiki } from "@/lib/types/wiki-types";
import NotPublishedBanner from "../banner/not-published-banner";
import WikiPublishDialog from "./wiki-publish-dialog";

type WikiInfoBannerProps = {
    wiki: Wiki;
    project: Project;
};

const WikiInfoBanner = ({ wiki, project }: WikiInfoBannerProps) => {
    if (wiki.status === "Draft") {
        return (
            <NotPublishedBanner
                predicate={wiki.status === "Draft"}
                title="This wiki is not published and can only be viewed by its members."
                button={<WikiPublishDialog wiki={wiki} project={project} />}
            />
        );
    }

    if (wiki.status === "Archived") {
        return (
            <NotPublishedBanner
                predicate={wiki.status === "Archived"}
                title="This wiki has been archived and is no longer visible to users."
                button={<WikiPublishDialog wiki={wiki} project={project} />}
            />
        );
    }

    return null;
};

export default WikiInfoBanner;
