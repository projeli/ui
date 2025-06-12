import { wikiApi } from "@/lib/api/wiki/wiki-api";
import { Card } from "../ui/card";

type WikiStatisticsProps = {
    projectSlug: string;
    wikiId?: string;
};

const WikiStatistics = async ({ projectSlug, wikiId }: WikiStatisticsProps) => {
    if (!wikiId) {
        const wiki = await wikiApi.getByProjectSlug(projectSlug);
        if (wiki) wikiId = wiki.id;
    }
    if (!wikiId) return null;

    const statistics = await wikiApi.getStatistics(wikiId);

    return (
        <Card className="p-6 h-max grid gap-4">
            <h2 className="text-xl font-semibold pb-4 border-b border-border">
                Statistics
            </h2>
            <WikiStatistic
                value={statistics.memberCount}
                label={{ singular: "Member", plural: "Members" }}
            />
            <WikiStatistic
                value={statistics.pageCount}
                label={{ singular: "Wiki Page", plural: "Wiki Pages" }}
            />
            <WikiStatistic
                value={statistics.categoryCount}
                label={{ singular: "Wiki Category", plural: "Wiki Categories" }}
            />
        </Card>
    );
};

type WikiStatisticProps = {
    value: string | number;
    label: {
        singular: string;
        plural: string;
    };
};

const WikiStatistic = async ({ value, label }: WikiStatisticProps) => {
    if (!value) return null;

    return (
        <div className="bg-muted rounded-lg p-4">
            <p className="text-xl font-black">{value}</p>
            <p className="text-sm flex items-center gap-2 text-muted-foreground">
                {value === 1 ? label.singular : label.plural}
            </p>
        </div>
    );
};

export default WikiStatistics;
