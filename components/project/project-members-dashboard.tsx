"use client";

import { updateMemberPermissionsAction } from "@/actions/shared/update-member-permissions";
import { useToast } from "@/hooks/use-toast";
import {
    Project,
    ProjectMemberPermissions,
    ProjectMember as ProjectMemberType,
} from "@/lib/types/project-types";
import { ProjeliUser } from "@/lib/types/user-types";
import {
    Wiki,
    WikiMember,
    WikiMemberPermissions,
} from "@/lib/types/wiki-types";
import {
    createFormToast,
    hasProjectPermission,
    hasWikiPermission,
} from "@/lib/utils";
import { ArrowRightToLine, ChevronDown, Crown, UserMinus2 } from "lucide-react";
import React, {
    startTransition,
    useActionState,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";
import { Input } from "../ui/input";
import LabeledCheckbox from "../ui/labeled-checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import ProjectCreateMemberDialog from "./project-create-member-dialog";
import ProjectMember from "./project-member";
import ProjectMemberDeleteDialog from "./project-member-delete-dialog";
import ProjectUpdateMemberRole from "./project-update-member-role";
import ProjectUpdateOwnershipDialog from "./project-update-ownership-dialog";

type ProjectMembersDashboardProps = {
    project: Project;
    wiki?: Wiki | undefined;
    members: ProjeliUser[];
    currentUserId: string;
};

type Permissions = {
    editProject: boolean;
    publishProject: boolean;
    manageLinks: boolean;
    addMembers: boolean;
    editRoles: boolean;
    editPermissions: boolean;
    removeMembers: boolean;
    deleteProject: boolean;
    editWikiDetails: boolean;
    createPages: boolean;
    editPages: boolean;
    publishPages: boolean;
    deletePages: boolean;
    createCategories: boolean;
    editCategories: boolean;
    deleteCategories: boolean;
    deleteWiki: boolean;
};

// Main Dashboard Component
const ProjectMembersDashboard: React.FC<ProjectMembersDashboardProps> = ({
    project,
    wiki,
    members,
    currentUserId,
}) => {
    const [query, setQuery] = useState("");
    const currentProjectMember = project.members.find(
        (m) => m.userId === currentUserId
    );
    const currentWikiMember = wiki?.members.find(
        (m) => m.userId === currentUserId
    );

    if (wiki?.status === "Uncreated") wiki = undefined;

    if (!currentProjectMember) return <div aria-live="polite">Loading...</div>;

    return (
        <div className="grid gap-6">
            <Card className="p-6 flex flex-wrap gap-4">
                <Input
                    type="text"
                    placeholder="Search members"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 min-w-48"
                    aria-label="Search project members"
                />
                <ProjectCreateMemberDialog project={project} />
            </Card>
            <Card className="p-6">
                <MemberList
                    members={members}
                    query={query}
                    project={project}
                    currentUserId={currentUserId}
                    currentProjectMember={currentProjectMember}
                    currentWikiMember={currentWikiMember}
                    wiki={wiki}
                />
            </Card>
            <LeaveProjectSection
                project={project}
                currentProjectMember={currentProjectMember}
            />
        </div>
    );
};

// Member List Component
const MemberList: React.FC<{
    members: ProjeliUser[];
    query: string;
    project: Project;
    currentUserId: string;
    currentProjectMember: ProjectMemberType;
    currentWikiMember?: WikiMember;
    wiki?: Wiki;
}> = React.memo(
    ({
        members,
        query,
        project,
        currentUserId,
        currentProjectMember,
        currentWikiMember,
        wiki,
    }) => {
        const filteredMembers = useMemo(
            () =>
                members.filter((member) =>
                    member.userName.toLowerCase().includes(query.toLowerCase())
                ),
            [members, query]
        );

        return (
            <div className="grid gap-2">
                {filteredMembers.map((member) => (
                    <MemberItem
                        key={member.userId}
                        member={member}
                        project={project}
                        currentUserId={currentUserId}
                        currentProjectMember={currentProjectMember}
                        currentWikiMember={currentWikiMember}
                        wiki={wiki}
                    />
                ))}
            </div>
        );
    }
);

// Member Item Component
const MemberItem: React.FC<{
    member: ProjeliUser;
    project: Project;
    currentUserId: string;
    currentProjectMember: ProjectMemberType;
    currentWikiMember?: WikiMember;
    wiki?: Wiki;
}> = ({
    member,
    project,
    currentUserId,
    currentProjectMember,
    currentWikiMember,
    wiki,
}) => {
    const projectMember = project.members.find(
        (m) => m.userId === member.userId
    );
    if (!projectMember) return null;

    const isOwner = projectMember.isOwner;
    const isCurrentUser = projectMember.userId === currentUserId;
    const isCurrentOwner = currentProjectMember.isOwner;
    const currentCanDeleteMembers = hasProjectPermission(
        currentProjectMember,
        ProjectMemberPermissions.DeleteProjectMembers
    );
    const currentCanEditRoles = hasProjectPermission(
        currentProjectMember,
        ProjectMemberPermissions.EditProjectMemberRoles
    );

    const canRemoveMember =
        !isCurrentUser &&
        (isCurrentOwner || (currentCanDeleteMembers && !isOwner));
    const canTransferOwnership = isCurrentOwner && !isCurrentUser;
    const showActions = canRemoveMember || canTransferOwnership;

    const canEditRole = isCurrentOwner || (currentCanEditRoles && !isOwner);

    const canEditPermissions =
        hasProjectPermission(
            currentProjectMember,
            ProjectMemberPermissions.EditProjectMemberPermissions
        ) || isCurrentUser;

    return (
        <Collapsible
            open={
                !showActions && !canEditRole && !canEditPermissions
                    ? false
                    : undefined
            }
            className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:border rounded-md"
        >
            <CollapsibleTrigger asChild>
                <button
                    className="h-14 w-full justify-start cursor-pointer flex items-center p-4 hover:bg-accent rounded-md"
                    aria-label={`Toggle permissions for ${member.userName}`}
                >
                    <UserRow
                        user={member}
                        project={project}
                        currentUserId={currentUserId}
                        currentMember={currentProjectMember}
                    />
                    {(showActions || canEditRole || canEditPermissions) && (
                        <ChevronDown className="ml-auto" aria-hidden="true" />
                    )}
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mx-6 my-2">
                <div className="grid gap-4">
                    {(showActions || canEditRole) && (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {showActions && (
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Actions
                                    </h3>
                                    <div className="flex flex-wrap gap-4">
                                        {canRemoveMember && (
                                            <ProjectMemberDeleteDialog
                                                project={project}
                                                button={{
                                                    variant: "destructive",
                                                    icon: <UserMinus2 />,
                                                    label: "Remove Member",
                                                }}
                                                userId={projectMember.userId}
                                                dialog={{
                                                    title: "Remove Member",
                                                    description:
                                                        "Are you sure you want to remove this member from the project?",
                                                    button: {
                                                        variant: "destructive",
                                                        label: "Remove Member",
                                                        icon: <UserMinus2 />,
                                                    },
                                                }}
                                            />
                                        )}
                                        {canTransferOwnership && (
                                            <ProjectUpdateOwnershipDialog
                                                project={project}
                                                button={{
                                                    variant: "outline",
                                                    icon: (
                                                        <Crown className="text-orange-400" />
                                                    ),
                                                    label: "Transfer Ownership",
                                                }}
                                                userId={projectMember.userId}
                                                dialog={{
                                                    title: "Transfer Ownership",
                                                    description:
                                                        "Are you sure you want to transfer ownership of this project?",
                                                    button: {
                                                        variant: "outline",
                                                        label: "Transfer Ownership",
                                                        icon: (
                                                            <Crown className="text-orange-400" />
                                                        ),
                                                    },
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                            {canEditRole && (
                                <ProjectUpdateMemberRole
                                    projectMember={projectMember}
                                />
                            )}
                        </div>
                    )}
                    {canEditPermissions && (
                        <PermissionsForm
                            currentProjectMember={currentProjectMember}
                            currentWikiMember={currentWikiMember}
                            projectMember={projectMember}
                            user={member}
                            wiki={wiki}
                        />
                    )}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

// Permissions Form Component
const PermissionsForm: React.FC<{
    currentProjectMember: ProjectMemberType;
    currentWikiMember?: WikiMember;
    projectMember: ProjectMemberType;
    user: ProjeliUser;
    wiki?: Wiki;
}> = ({
    currentProjectMember,
    currentWikiMember,
    projectMember,
    user,
    wiki,
}) => {
    const isOwner = projectMember.isOwner;
    const isSelf = projectMember.id === currentProjectMember.id;
    const cannotEditPermissions = isOwner || isSelf;

    const wikiMember = wiki?.members.find((m) => m.userId === user.userId);

    const initialPermissions: Permissions = {
        editProject: hasProjectPermission(
            projectMember,
            ProjectMemberPermissions.EditProject
        ),
        publishProject: hasProjectPermission(
            projectMember,
            ProjectMemberPermissions.PublishProject
        ),
        manageLinks: hasProjectPermission(
            projectMember,
            ProjectMemberPermissions.ManageLinks
        ),
        addMembers: hasProjectPermission(
            projectMember,
            ProjectMemberPermissions.AddProjectMembers
        ),
        editRoles: hasProjectPermission(
            projectMember,
            ProjectMemberPermissions.EditProjectMemberRoles
        ),
        editPermissions: hasProjectPermission(
            projectMember,
            ProjectMemberPermissions.EditProjectMemberPermissions
        ),
        removeMembers: hasProjectPermission(
            projectMember,
            ProjectMemberPermissions.DeleteProjectMembers
        ),
        deleteProject: hasProjectPermission(
            projectMember,
            ProjectMemberPermissions.DeleteProject
        ),
        editWikiDetails: wikiMember
            ? hasWikiPermission(wikiMember, WikiMemberPermissions.EditWiki)
            : false,
        createPages: wikiMember
            ? hasWikiPermission(
                  wikiMember,
                  WikiMemberPermissions.CreateWikiPages
              )
            : false,
        editPages: wikiMember
            ? hasWikiPermission(wikiMember, WikiMemberPermissions.EditWikiPages)
            : false,
        publishPages: wikiMember
            ? hasWikiPermission(
                  wikiMember,
                  WikiMemberPermissions.PublishWikiPages
              )
            : false,
        deletePages: wikiMember
            ? hasWikiPermission(
                  wikiMember,
                  WikiMemberPermissions.DeleteWikiPages
              )
            : false,
        createCategories: wikiMember
            ? hasWikiPermission(
                  wikiMember,
                  WikiMemberPermissions.CreateWikiCategories
              )
            : false,
        editCategories: wikiMember
            ? hasWikiPermission(
                  wikiMember,
                  WikiMemberPermissions.EditWikiCategories
              )
            : false,
        deleteCategories: wikiMember
            ? hasWikiPermission(
                  wikiMember,
                  WikiMemberPermissions.DeleteWikiCategories
              )
            : false,
        deleteWiki: wikiMember
            ? hasWikiPermission(wikiMember, WikiMemberPermissions.DeleteWiki)
            : false,
    };

    const [permissions, setPermissions] = useState(initialPermissions);
    const [formState, formAction, isLoading] = useActionState(
        updateMemberPermissionsAction,
        {}
    );

    const handlePermissionChange = useCallback(
        (permission: keyof Permissions, value: boolean) => {
            setPermissions((prev) => ({ ...prev, [permission]: value }));
        },
        []
    );

    const handleSubmit = () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("projectId", projectMember.projectId);
            formData.append("wikiId", wiki?.id || "");
            formData.append("projectMemberId", projectMember.id);
            formData.append("wikiMemberId", wikiMember?.id || "");
            formData.append("permissions", JSON.stringify(permissions));
            formAction(formData);
        });
    };

    const { toast } = useToast();

    useEffect(() => {
        createFormToast(toast, formState, "Permissions updated successfully.");
    }, [formState, toast]);

    return (
        <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Permissions</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col gap-2 mx-2">
                    <h4 className="text-base font-semibold">Project</h4>
                    <LabeledCheckbox
                        label="Edit Project"
                        name="editProject"
                        checked={permissions.editProject}
                        onCheckedChange={(checked) =>
                            handlePermissionChange(
                                "editProject",
                                checked === true
                            )
                        }
                        disabled={
                            !hasProjectPermission(
                                currentProjectMember,
                                ProjectMemberPermissions.EditProject
                            ) || cannotEditPermissions
                        }
                    />
                    <LabeledCheckbox
                        label="Publish Project"
                        name="publishProject"
                        checked={permissions.publishProject}
                        onCheckedChange={(checked) =>
                            handlePermissionChange(
                                "publishProject",
                                checked === true
                            )
                        }
                        disabled={
                            !hasProjectPermission(
                                currentProjectMember,
                                ProjectMemberPermissions.PublishProject
                            ) || cannotEditPermissions
                        }
                    />
                    <LabeledCheckbox
                        label="Manage Links"
                        name="manageLinks"
                        checked={permissions.manageLinks}
                        onCheckedChange={(checked) =>
                            handlePermissionChange(
                                "manageLinks",
                                checked === true
                            )
                        }
                        disabled={
                            !hasProjectPermission(
                                currentProjectMember,
                                ProjectMemberPermissions.ManageLinks
                            ) || cannotEditPermissions
                        }
                    />
                </div>
                <div className="flex flex-col gap-2 mx-2">
                    <h4 className="text-base font-semibold">Members</h4>
                    <LabeledCheckbox
                        label="Add Members"
                        name="addMembers"
                        checked={permissions.addMembers}
                        onCheckedChange={(checked) =>
                            handlePermissionChange(
                                "addMembers",
                                checked === true
                            )
                        }
                        disabled={
                            !hasProjectPermission(
                                currentProjectMember,
                                ProjectMemberPermissions.AddProjectMembers
                            ) || cannotEditPermissions
                        }
                    />
                    <LabeledCheckbox
                        label="Edit Roles"
                        name="editRoles"
                        checked={permissions.editRoles}
                        onCheckedChange={(checked) =>
                            handlePermissionChange(
                                "editRoles",
                                checked === true
                            )
                        }
                        disabled={
                            !hasProjectPermission(
                                currentProjectMember,
                                ProjectMemberPermissions.EditProjectMemberRoles
                            ) || cannotEditPermissions
                        }
                    />
                    <LabeledCheckbox
                        label="Edit Permissions"
                        name="editPermissions"
                        checked={permissions.editPermissions}
                        onCheckedChange={(checked) =>
                            handlePermissionChange(
                                "editPermissions",
                                checked === true
                            )
                        }
                        disabled={
                            !hasProjectPermission(
                                currentProjectMember,
                                ProjectMemberPermissions.EditProjectMemberPermissions
                            ) || cannotEditPermissions
                        }
                    />
                    <LabeledCheckbox
                        label="Remove Members"
                        name="removeMembers"
                        checked={permissions.removeMembers}
                        onCheckedChange={(checked) =>
                            handlePermissionChange(
                                "removeMembers",
                                checked === true
                            )
                        }
                        disabled={
                            !hasProjectPermission(
                                currentProjectMember,
                                ProjectMemberPermissions.DeleteProjectMembers
                            ) || cannotEditPermissions
                        }
                    />
                </div>
                {wikiMember && (
                    <>
                        <div className="flex flex-col gap-2 mx-2">
                            <h4 className="text-base font-semibold">Wiki</h4>
                            <LabeledCheckbox
                                label="Edit Details"
                                name="editWikiDetails"
                                checked={permissions.editWikiDetails}
                                onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                        "editWikiDetails",
                                        checked === true
                                    )
                                }
                                disabled={
                                    !hasWikiPermission(
                                        currentWikiMember!,
                                        WikiMemberPermissions.EditWiki
                                    ) || cannotEditPermissions
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2 mx-2">
                            <h4 className="text-base font-semibold">
                                Wiki Pages
                            </h4>
                            <LabeledCheckbox
                                label="Create Pages"
                                name="createPages"
                                checked={permissions.createPages}
                                onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                        "createPages",
                                        checked === true
                                    )
                                }
                                disabled={
                                    !hasWikiPermission(
                                        currentWikiMember!,
                                        WikiMemberPermissions.CreateWikiPages
                                    ) || cannotEditPermissions
                                }
                            />
                            <LabeledCheckbox
                                label="Edit Pages"
                                name="editPages"
                                checked={permissions.editPages}
                                onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                        "editPages",
                                        checked === true
                                    )
                                }
                                disabled={
                                    !hasWikiPermission(
                                        currentWikiMember!,
                                        WikiMemberPermissions.EditWikiPages
                                    ) || cannotEditPermissions
                                }
                            />
                            <LabeledCheckbox
                                label="Publish Pages"
                                name="publishPages"
                                checked={permissions.publishPages}
                                onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                        "publishPages",
                                        checked === true
                                    )
                                }
                                disabled={
                                    !hasWikiPermission(
                                        currentWikiMember!,
                                        WikiMemberPermissions.PublishWikiPages
                                    ) || cannotEditPermissions
                                }
                            />
                            <LabeledCheckbox
                                label="Delete Pages"
                                name="deletePages"
                                checked={permissions.deletePages}
                                onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                        "deletePages",
                                        checked === true
                                    )
                                }
                                disabled={
                                    !hasWikiPermission(
                                        currentWikiMember!,
                                        WikiMemberPermissions.DeleteWikiPages
                                    ) || cannotEditPermissions
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2 mx-2">
                            <h4 className="text-base font-semibold">
                                Wiki Categories
                            </h4>
                            <LabeledCheckbox
                                label="Create Categories"
                                name="createCategories"
                                checked={permissions.createCategories}
                                onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                        "createCategories",
                                        checked === true
                                    )
                                }
                                disabled={
                                    !hasWikiPermission(
                                        currentWikiMember!,
                                        WikiMemberPermissions.CreateWikiCategories
                                    ) || cannotEditPermissions
                                }
                            />
                            <LabeledCheckbox
                                label="Edit Categories"
                                name="editCategories"
                                checked={permissions.editCategories}
                                onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                        "editCategories",
                                        checked === true
                                    )
                                }
                                disabled={
                                    !hasWikiPermission(
                                        currentWikiMember!,
                                        WikiMemberPermissions.EditWikiCategories
                                    ) || cannotEditPermissions
                                }
                            />
                            <LabeledCheckbox
                                label="Delete Categories"
                                name="deleteCategories"
                                checked={permissions.deleteCategories}
                                onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                        "deleteCategories",
                                        checked === true
                                    )
                                }
                                disabled={
                                    !hasWikiPermission(
                                        currentWikiMember!,
                                        WikiMemberPermissions.DeleteWikiCategories
                                    ) || cannotEditPermissions
                                }
                            />
                        </div>
                    </>
                )}
                <div className="flex flex-col gap-2 mx-2">
                    <h4 className="text-base font-semibold">Be Careful!</h4>
                    <LabeledCheckbox
                        label="Delete Project"
                        name="deleteProject"
                        checked={permissions.deleteProject}
                        onCheckedChange={(checked) =>
                            handlePermissionChange(
                                "deleteProject",
                                checked === true
                            )
                        }
                        disabled={
                            !hasProjectPermission(
                                currentProjectMember,
                                ProjectMemberPermissions.DeleteProject
                            ) || cannotEditPermissions
                        }
                    />
                    {wikiMember && (
                        <LabeledCheckbox
                            label="Delete Wiki"
                            name="deleteWiki"
                            checked={permissions.deleteWiki}
                            onCheckedChange={(checked) =>
                                handlePermissionChange(
                                    "deleteWiki",
                                    checked === true
                                )
                            }
                            disabled={
                                !hasWikiPermission(
                                    currentWikiMember!,
                                    WikiMemberPermissions.DeleteWiki
                                ) || cannotEditPermissions
                            }
                        />
                    )}
                </div>
            </div>
            <div className="mb-4 flex justify-end">
                <Button
                    onClick={handleSubmit}
                    disabled={
                        projectMember.isOwner ||
                        projectMember.id === currentProjectMember.id ||
                        isLoading
                    }
                    aria-label={
                        isLoading
                            ? "Updating permissions..."
                            : "Update permissions"
                    }
                >
                    {isLoading ? "Updating..." : "Update Permissions"}
                </Button>
            </div>
        </div>
    );
};

// Leave Project Section Component
const LeaveProjectSection: React.FC<{
    project: Project;
    currentProjectMember: ProjectMemberType;
}> = ({ project, currentProjectMember }) => (
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
                                        disabled: currentProjectMember.isOwner,
                                        variant: "destructive",
                                        icon: <ArrowRightToLine />,
                                        label: "Leave Project",
                                    }}
                                    userId={currentProjectMember.userId}
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
                            {currentProjectMember.isOwner
                                ? "Transfer ownership before leaving"
                                : "Leave project"}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    </Card>
);

// UserRow Component (Imported as-is, assumed to be secure and accessible)
const UserRow = React.memo<{
    user: ProjeliUser;
    project: Project;
    currentUserId: string;
    currentMember: ProjectMemberType;
}>(({ user, project, currentUserId, currentMember }) => (
    <div className="flex gap-2 justify-between items-center w-full">
        {/* Assuming ProjectMember component is secure and accessible */}
        <div className="flex-1">
            <ProjectMember project={project} member={user} />
        </div>
        {/* Additional controls like ownership transfer or delete can be added here */}
    </div>
));

export default ProjectMembersDashboard;
