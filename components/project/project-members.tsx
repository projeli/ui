import { Card } from "@/components/ui/card";
import { userApi } from "@/lib/api/user/user-api";
import { Project } from "@/lib/types/project-types";
import { cache } from "react";
import Anchor from "../navigation/anchor";
import ProjectMember from "./project-member";

const getMembers = cache(async (userIds: string[]) => {
    return await userApi.getByIds(userIds);
});

export default async function ProjectMembers({
    project,
    memberIds,
}: {
    project: Project;
    memberIds: string[];
}) {
    const members = await getMembers(memberIds);

    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold pb-2 border-b border-border">
                Members
            </h2>
            <div className="grid mt-4">
                {members.map((member) => (
                    <Anchor
                        key={member.id}
                        href={`/users/${member.userName}`}
                        variant="ghost"
                        className="justify-start h-14"
                    >
                        <ProjectMember project={project} member={member} />
                    </Anchor>
                ))}
            </div>
        </Card>
    );
}
