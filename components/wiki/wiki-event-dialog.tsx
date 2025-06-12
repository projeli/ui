import { ProjeliUser } from "@/lib/types/user-types";
import {
    WikiEvent as TWikiEvent,
    WikiCategory,
    wikiEventNames,
    WikiPage,
} from "@/lib/types/wiki-types";
import { FileQuestion } from "lucide-react";
import moment from "moment";
import Anchor from "../navigation/anchor";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { WikiEvent } from "./wiki-events";

type WikiEventDialogProps = {
    event: TWikiEvent;
    user?: ProjeliUser;
    users: ProjeliUser[];
    pages: Record<string, WikiPage>;
    categories: Record<string, WikiCategory>;
};

const WikiEventDialog = ({
    event,
    user,
    users,
    pages,
    categories,
}: WikiEventDialogProps) => {
    const wikiEventComponent = (
        <WikiEvent
            event={event}
            users={users}
            pages={pages}
            categories={categories}
        />
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="px-4 py-2 rounded-md justify-start hover:bg-background h-max w-full"
                    icon={
                        <Avatar className="size-6">
                            <AvatarImage
                                src={user?.imageUrl}
                                alt={user?.userName}
                            />
                            <AvatarFallback>
                                <FileQuestion />
                            </AvatarFallback>
                        </Avatar>
                    }
                >
                    <div className="whitespace-break-spaces text-start">
                        {wikiEventComponent}
                    </div>
                    <span className="text-xs text-muted-foreground ml-auto">
                        {moment(event.timestamp).fromNow()}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="p-8">
                <DialogHeader>
                    <DialogTitle>{wikiEventNames[event.$type]}</DialogTitle>
                    <div className="p-4 grid gap-4">
                        <div>
                            <h3 className="text-card-foreground font-semibold">
                                Description
                            </h3>
                            {wikiEventComponent}
                        </div>
                        <div>
                            <h3 className="text-card-foreground font-semibold">
                                Performed by
                            </h3>
                            <div className="flex items-center gap-2 text-card-foreground">
                                {user ? (
                                    <Anchor
                                        variant="ghost"
                                        href={`/users/${user.id}`}
                                    >
                                        <Avatar className="size-6">
                                            <AvatarImage
                                                src={user?.imageUrl}
                                                alt={user?.userName}
                                            />
                                            <AvatarFallback>
                                                <FileQuestion />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>@{user.userName}</div>
                                    </Anchor>
                                ) : (
                                    <Button variant="ghost">
                                        <Avatar className="size-6">
                                            <AvatarFallback>
                                                <FileQuestion />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>Deleted user</div>
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-card-foreground font-semibold">
                                Timestamp
                            </h3>
                            <div className="text-card-foreground">
                                {moment(event.timestamp).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                )}
                            </div>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default WikiEventDialog;
