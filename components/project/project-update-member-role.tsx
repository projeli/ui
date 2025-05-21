"use client";

import { updateProjectMemberRoleAction } from "@/actions/project/update-member-role";
import { useToast } from "@/hooks/use-toast";
import { ProjectMember } from "@/lib/types/project-types";
import { createFormToast } from "@/lib/utils";
import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type ProjectUpdateMemberRoleProps = {
    projectMember: ProjectMember;
};

const ProjectUpdateMemberRole = ({
    projectMember,
}: ProjectUpdateMemberRoleProps) => {
    const { toast } = useToast();
    const [formState, formAction, isLoading] = useActionState(
        updateProjectMemberRoleAction,
        {}
    );

    useEffect(() => {
        createFormToast(
            toast,
            formState,
            "The role has been updated successfully."
        );
        projectMember.role =
            (formState as any)?.data?.role || projectMember.role;
    }, [formState, toast]);

    return (
        <form action={formAction}>
            <h3 className="text-lg font-semibold">Role</h3>
            <div className="flex gap-2">
                <input
                    type="hidden"
                    name="id"
                    value={projectMember.projectId}
                />
                <input type="hidden" name="memberId" value={projectMember.id} />
                <Input
                    type="text"
                    name="role"
                    defaultValue={projectMember.role}
                />
                <Button loading={isLoading}>Update Role</Button>
            </div>
        </form>
    );
};

export default ProjectUpdateMemberRole;
