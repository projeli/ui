import { ProjectLinkType } from "@/lib/types/project-types";
import { BookOpen, Bug, Code, Globe, Link, Users } from "lucide-react";

const ProjectLinkIcon = ({ type }: { type: ProjectLinkType }) => {
    const icons: Record<ProjectLinkType, React.ReactNode> = {
        Website: <Globe className="size-4" />,
        SourceCode: <Code className="size-4" />,
        Documentation: <BookOpen className="size-4" />,
        IssueTracker: <Bug className="size-4" />,
        Social: <Users className="size-4" />,
    };

    return <div>{icons[type] || <Link className="size-4" />}</div>;
};

export default ProjectLinkIcon;
