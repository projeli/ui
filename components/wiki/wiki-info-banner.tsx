import { Project } from "@/lib/types/project-types";
import {
    Wiki,
    WikiMember,
    WikiMemberPermissions,
} from "@/lib/types/wiki-types";
import { hasWikiPermission } from "@/lib/utils";
import NotPublishedBanner from "../banner/not-published-banner";
import WikiPublishDialog from "./wiki-publish-dialog";

type WikiInfoBannerProps = {
    project: Project;
    wiki: Wiki;
    wikiMember: WikiMember | undefined;
};

const WikiInfoBanner = ({
    wiki,
    project,
    wikiMember,
}: WikiInfoBannerProps) => {
    if (!wiki || !wikiMember) return null;

    const hasPublishPermission = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.PublishWiki
    );

    if (wiki.status === "Draft") {
        return (
            <NotPublishedBanner
                predicate={wiki.status === "Draft"}
                title="This wiki is not published and can only be viewed by its members."
                button={
                    hasPublishPermission ? (
                        <WikiPublishDialog wiki={wiki} project={project} />
                    ) : null
                }
            />
        );
    }

    if (wiki.status === "Archived") {
        return (
            <NotPublishedBanner
                predicate={wiki.status === "Archived"}
                title="This wiki has been archived and is no longer visible to users."
                button={
                    hasPublishPermission ? (
                        <WikiPublishDialog wiki={wiki} project={project} />
                    ) : null
                }
            />
        );
    }

    return null;
};

export default WikiInfoBanner;
