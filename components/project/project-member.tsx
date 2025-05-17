import { Project } from "@/lib/types/project-types";
import { ProjeliUser } from "@/lib/types/user-types";
import { Crown, FileQuestion } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type ProjectMemberProps = {
    project: Project;
    member: ProjeliUser;
};

const ProjectMember = ({ project, member }: ProjectMemberProps) => {
    return (
        <div className="flex gap-2 relative text-start">
            <Avatar>
                <AvatarImage src={member.imageUrl} alt={member.userName} />
                <AvatarFallback>
                    <FileQuestion />
                </AvatarFallback>
            </Avatar>
            <div className="grid">
                <h3 className="text-base font-semibold leading-4">
                    <span className="flex gap-1 items-center">
                        {member.userName}
                        {project.members.find((m) => m.userId === member.id)
                            ?.isOwner && (
                            <Crown className="!size-3 text-orange-400" />
                        )}
                    </span>
                </h3>
                <p className="text-xs text-muted-foreground">
                    {project.members.find((m) => m.userId === member.id)
                        ?.role || "Member"}
                </p>
            </div>
        </div>
    );
};

export default ProjectMember;
