import ProjectImage from "@/components/project/project-image";
import { Card } from "@/components/ui/card";
import WikiPageInfoBanner from "@/components/wiki/wiki-page-info-banner";
import { Wiki, WikiMember, WikiPage } from "@/lib/types/wiki-types";
import Link from "next/link";

type DashboardWikiPageHeaderProps = {
    wiki: Wiki;
    page: WikiPage;
    wikiMember: WikiMember;
};

const DashboardWikiPageHeader = ({
    wiki,
    page,
    wikiMember,
}: DashboardWikiPageHeaderProps) => {
    return (
        <>
            <WikiPageInfoBanner
                wiki={wiki}
                page={page}
                wikiMember={wikiMember}
            />
            <Card className="p-6 flex gap-4 h-max">
                <ProjectImage
                    project={{
                        name: wiki.projectName,
                        slug: wiki.projectSlug,
                        imageUrl: wiki.projectImageUrl,
                    }}
                    size="md"
                    href={"/projects"}
                />
                <div className="flex gap-4">
                    <Link href={`/projects/${wiki.projectSlug}/wiki/${page.slug}`}>
                        <h2 className="text-3xl font-bold  hover:underline">
                            {page.title}
                        </h2>
                        <p className="text-sm text-muted-foreground hover:underline">
                            {wiki.projectSlug}/wiki/{page.slug}
                        </p>
                    </Link>
                </div>
            </Card>
        </>
    );
};

export default DashboardWikiPageHeader;
