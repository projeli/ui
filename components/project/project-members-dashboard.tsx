"use client";

import {
    Project,
    ProjectMemberPermissions,
    ProjectMember as ProjectMemberType,
} from "@/lib/types/project-types";
import { ProjeliUser } from "@/lib/types/user-types";
import { hasProjectPermission } from "@/lib/utils";
import { ArrowRightToLine, ChevronDown, Crown, UserMinus2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";
import { Input } from "../ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import ProjectCreateMemberDialog from "./project-create-member-dialog";
import ProjectMember from "./project-member";
import ProjectMemberDeleteDialog from "./project-member-delete-dialog";
import ProjectUpdateOwnershipDialog from "./project-update-ownership-dialog";

type ProjectMembersDashboardProps = {
    project: Project;
    members: ProjeliUser[];
    currentUserId: string;
};

const ProjectMembersDashboard = ({
    project,
    members,
    currentUserId,
}: ProjectMembersDashboardProps) => {
    const [query, setQuery] = useState<string>("");

    const currentMember = project.members.find(
        (member) => member.userId === currentUserId
    );

    if (!currentMember) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid gap-6">
            <Card className="p-6 flex flex-wrap gap-4">
                <Input
                    type="text"
                    placeholder="Search members"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 min-w-48"
                />
                <ProjectCreateMemberDialog project={project} />
            </Card>
            <Card className="p-6">
                <div className="grid gap-2">
                    {members
                        .filter((member) =>
                            member.userName
                                .toLowerCase()
                                .includes(query.toLowerCase())
                        )
                        .map((member) => (
                            <Collapsible
                                className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:border rounded-md"
                                key={member.id}
                            >
                                <CollapsibleTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-14 w-full justify-start"
                                    >
                                        <UserRow
                                            key={member.id}
                                            user={member}
                                            project={project}
                                            currentUserId={currentUserId}
                                            currentMember={currentMember}
                                        />
                                        <ChevronDown className="ml-auto" />
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mx-4 my-2">
                                    Yes. Free to use for personal and commercial
                                    projects. No attribution required.
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                </div>
            </Card>
            <Card className="p-6 h-max grid gap-4 border-destructive">
                <div className="flex flex-wrap gap-4 justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold">Leave Project</h3>
                        <p className="text-sm text-muted-foreground">
                            Leave this project to remove it from your dashboard.
                        </p>
                    </div>
                    <div className="flex w-full sm:w-max">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div>
                                        <ProjectMemberDeleteDialog
                                            project={project}
                                            button={{
                                                disabled: currentMember.isOwner,
                                                variant: "destructive",
                                                icon: <ArrowRightToLine />,
                                                label: "Leave Project",
                                            }}
                                            userId={currentUserId}
                                            dialog={{
                                                title: "Leave Project",
                                                description:
                                                    "Are you sure you want to leave this project?",
                                                button: {
                                                    variant: "destructive",
                                                    label: "Leave Project",
                                                    icon: <ArrowRightToLine />,
                                                },
                                            }}
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {currentMember.isOwner
                                        ? "Transfer ownership before leaving"
                                        : "Leave project"}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const UserRow = ({
    user,
    project,
    currentUserId,
    currentMember,
}: {
    user: ProjeliUser;
    project: Project;
    currentUserId: string;
    currentMember: ProjectMemberType;
}) => {
    const canDeleteMember = hasProjectPermission(
        currentMember,
        ProjectMemberPermissions.DeleteProjectMembers
    );
    const isCurrentUser = user.id === currentUserId;
    const isOwner = currentMember.isOwner;

    return (
        <div
            className="flex gap-2 justify-between items-center w-full"
            key={user.id}
        >
            <div className="flex-1">
                <ProjectMember key={user.id} project={project} member={user} />
            </div>
            {isOwner && !isCurrentUser && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>
                                <ProjectUpdateOwnershipDialog
                                    project={project}
                                    button={{
                                        variant: "outline",
                                        icon: <Crown />,
                                        className:
                                            "size-10 text-orange-400 hover:text-orange-600",
                                    }}
                                    userId={user.id}
                                    dialog={{
                                        title: "Transfer Ownership",
                                        description: `Are you sure you want to transfer ownership to ${user.userName}?`,
                                        button: {
                                            variant: "outline",
                                            label: "Transfer Ownership",
                                            icon: <Crown />,
                                        },
                                    }}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>Transfer Ownership</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
            {canDeleteMember &&
                !isCurrentUser &&
                !project.members.find((x) => x.userId === user.id)?.isOwner && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <ProjectMemberDeleteDialog
                                        project={project}
                                        button={{
                                            variant: "destructive",
                                            icon: <UserMinus2 />,
                                            className: "size-10",
                                        }}
                                        userId={user.id}
                                        dialog={{
                                            title: "Remove Member",
                                            description: `Are you sure you want to remove ${user.userName} from this project?`,
                                            button: {
                                                variant: "destructive",
                                                label: "Remove Member",
                                                icon: <UserMinus2 />,
                                            },
                                        }}
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                {isOwner
                                    ? "Remove member"
                                    : "Only project owner can remove members"}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
        </div>
    );
};

export default ProjectMembersDashboard;
