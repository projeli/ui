import {
    Wiki,
    WikiMember,
    WikiMemberPermissions,
} from "@/lib/types/wiki-types";
import { hasWikiPermission } from "@/lib/utils";
import NotPublishedBanner from "../banner/not-published-banner";
import WikiPublishDialog from "./wiki-publish-dialog";

type WikiInfoBannerProps = {
    wiki: Wiki;
    wikiMember: WikiMember | undefined;
    className?: string;
};

const WikiInfoBanner = ({
    wiki,
    wikiMember,
    className,
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
                        <WikiPublishDialog wiki={wiki} />
                    ) : null
                }
                className={className}
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
                        <WikiPublishDialog wiki={wiki} />
                    ) : null
                }
                className={className}
            />
        );
    }

    return null;
};

export default WikiInfoBanner;
