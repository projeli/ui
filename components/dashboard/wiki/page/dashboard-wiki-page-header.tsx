import { Card } from "@/components/ui/card";
import WikiPublishPageDialog from "@/components/wiki/wiki-publish-page-dialog";
import { Project } from "@/lib/types/project-types";
import { WikiPage } from "@/lib/types/wiki-types";
import Link from "next/link";

type DashboardWikiPageHeaderProps = {
    project: Project;
    page: WikiPage;
    wikiId: string;
};

const DashboardWikiPageHeader = ({
    project,
    page,
    wikiId,
}: DashboardWikiPageHeaderProps) => {
    return (
        <>
            {(page.status === "Draft" || page.status === "Archived") && (
                <Card className="px-6 py-4 bg-destructive flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <p className="text-sm text-destructive-foreground">
                        {page.status === "Draft"
                            ? "This page has not been published yet and is only visible to project members."
                            : "This page has been archived and is no longer visible to users."}
                    </p>
                    <div>
                        <WikiPublishPageDialog
                            page={page}
                            project={project}
                            wikiId={wikiId}
                        />
                    </div>
                </Card>
            )}
            <Card className="p-6 h-max">
                <div className="flex gap-4">
                    <Link href={`/projects/${project.slug}/wiki/${page.slug}`}>
                        <h2 className="text-2xl font-semibold hover:underline">
                            {page.title}
                        </h2>
                        <p className="text-xs text-muted-foreground hover:underline">
                            {project.slug}/wiki/{page.slug}
                        </p>
                    </Link>
                </div>
            </Card>
        </>
    );
};

export default DashboardWikiPageHeader;
