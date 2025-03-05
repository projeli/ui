import { Project } from "@/lib/types/project-types";
import moment from "moment";
import { Card } from "../ui/card";

const ProjectDetails = ({ project }: { project: Project }) => {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold pb-2 border-b border-border">
                Details
            </h2>
            <div className="grid mt-4">
                <div className="flex gap-2">
                    <p className="font-medium">Published:</p>
                    {project.status === "Published" ? (
                        <p className="text-card-foreground/80">
                            {moment(project.publishedAt).format("MMM D, YYYY")}
                        </p>
                    ) : (
                        <p className="text-card-foreground/80">Never</p>
                    )}
                </div>
                {project.updatedAt && (
                    <div className="flex gap-2">
                        <p className="font-medium">Last Updated:</p>
                        <p className="text-card-foreground/80">
                            {moment(project.updatedAt).format("MMM D, YYYY")}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ProjectDetails;
