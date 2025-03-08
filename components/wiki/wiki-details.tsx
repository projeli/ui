import { Wiki } from "@/lib/types/wiki-types";
import moment from "moment";
import { Card } from "../ui/card";

const WikiDetails = ({ wiki }: { wiki: Wiki }) => {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold pb-2 border-b border-border">
                Details
            </h2>
            <div className="grid mt-4">
                <div className="flex gap-2">
                    <p className="font-medium">Published:</p>
                    {wiki.status === "Published" ? (
                        <p className="text-muted-foreground">
                            {moment(wiki.publishedAt).format("MMM D, YYYY")}
                        </p>
                    ) : (
                        <p className="text-muted-foreground">Never</p>
                    )}
                </div>
                {wiki.updatedAt && (
                    <div className="flex gap-2">
                        <p className="font-medium">Last Updated:</p>
                        <p className="text-muted-foreground">
                            {moment(wiki.updatedAt).format("MMM D, YYYY")}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default WikiDetails;
