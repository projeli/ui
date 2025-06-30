import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userApi } from "@/lib/api/user/user-api";
import { FileQuestion } from "lucide-react";
import Anchor from "../navigation/anchor";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";

type AvatarGroupProps = {
    users: { userId: string }[];
    title?: string;
    size?: "small" | "medium" | "large";
};

export default async function AvatarGroup({
    users,
    title = "Users",
    size = "medium",
}: AvatarGroupProps) {
    const projeliUsers = await userApi.getByIds(
        users.map((user) => user.userId)
    );

    if (!projeliUsers || projeliUsers.length === 0) {
        return null;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center -space-x-2 *:ring-3 *:ring-background">
                    {projeliUsers?.slice(0, 4).map((user, index) => (
                        <Avatar key={index} className="size-6">
                            <AvatarImage
                                src={user.imageUrl}
                                alt={user.userName}
                            />
                            <AvatarFallback>
                                <FileQuestion />
                            </AvatarFallback>
                        </Avatar>
                    ))}
                    {projeliUsers?.length > 4 && (
                        <Avatar className="z-10 text-sm font-medium text-muted-foreground">
                            <AvatarFallback>
                                +{projeliUsers.length - 4}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 max-h-64 overflow-y-auto">
                    {projeliUsers.map((user) => (
                        <Anchor
                            href={`/users/${user.userName}`}
                            size="lg"
                            variant="ghost"
                            key={user.userId}
                            className="justify-start"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={user.imageUrl}
                                    alt={user.userName}
                                />
                                <AvatarFallback>
                                    <FileQuestion />
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.userName}</span>
                        </Anchor>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
