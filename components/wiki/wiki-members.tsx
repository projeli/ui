import Anchor from "@/components/navigation/anchor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { userApi } from "@/lib/api/user/user-api";
import { Wiki } from "@/lib/types/wiki-types";
import { Crown, FileQuestion } from "lucide-react";
import { cache } from "react";

const getMembers = cache(async (userIds: string[]) => {
    return await userApi.getByIds(userIds);
});

export default async function WikiMembers({
    wiki,
    memberIds,
}: {
    wiki: Wiki;
    memberIds: string[];
}) {
    const members = await getMembers(memberIds);

    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold pb-2 border-b border-border">
                Authors
            </h2>
            <div className="grid mt-4">
                {members.map((member) => (
                    <Anchor
                        key={member.id}
                        href={`/users/${member.userName}`}
                        variant="ghost"
                        className="flex gap-2 justify-start h-14 relative"
                    >
                        <Avatar>
                            <AvatarImage
                                src={member.imageUrl}
                                alt={member.userName}
                            />
                            <AvatarFallback>
                                <FileQuestion />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-base font-semibold leading-4">
                                <span className="flex gap-1 items-center">
                                    {member.firstName} {member.lastName}{" "}
                                    {wiki.members.find(
                                        (m) => m.userId === member.id
                                    )?.isOwner && (
                                        <Crown className="!size-3 text-orange-400" />
                                    )}
                                </span>
                            </h3>
                            <p className="text-xs text-card-foreground/50">
                                @{member.userName}
                            </p>
                        </div>
                    </Anchor>
                ))}
            </div>
        </Card>
    );
}
