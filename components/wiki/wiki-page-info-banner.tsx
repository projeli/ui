import {
    Wiki,
    WikiMember,
    WikiMemberPermissions,
    WikiPage
} from "@/lib/types/wiki-types";
import { hasWikiPermission } from "@/lib/utils";
import NotPublishedBanner from "../banner/not-published-banner";
import WikiPublishPageDialog from "./wiki-publish-page-dialog";

type WikiPageInfoBannerProps = {
    wiki: Wiki;
    page: WikiPage;
    wikiMember: WikiMember | undefined;
    className?: string;
};

const WikiPageInfoBanner = ({
    wiki,
    page,
    wikiMember,
    className
}: WikiPageInfoBannerProps) => {
    if (!page || !wikiMember) return null;

    const hasPublishPermission = hasWikiPermission(
        wikiMember,
        WikiMemberPermissions.PublishWikiPages
    );

    if (page.status === "Draft") {
        return (
            <NotPublishedBanner
                predicate={page.status === "Draft"}
                title="This wiki page is not published and can only be viewed by its members."
                button={
                    hasPublishPermission ? (
                        <WikiPublishPageDialog wiki={wiki} page={page} />
                    ) : null
                }
                className={className}
            />
        );
    }

    if (page.status === "Archived") {
        return (
            <NotPublishedBanner
                predicate={page.status === "Archived"}
                title="This wiki page has been archived and is no longer visible to users."
                button={
                    hasPublishPermission ? (
                        <WikiPublishPageDialog wiki={wiki} page={page} />
                    ) : null
                }
                className={className}
            />
        );
    }

    return null;
};

export default WikiPageInfoBanner;
