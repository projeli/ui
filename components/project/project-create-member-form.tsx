"use client";

import { createProjectMemberAction } from "@/actions/project/create-project-member";
import { Project } from "@/lib/types/project-types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import SmartForm from "../form/smart-form";
import UserSearchAndSelect from "../user/user-search-and-select";

const ProjectCreateMemberForm = ({ project }: { project: Project }) => {
    const [userId, setUserId] = useState<string>("");

    return (
        <div className="mt-4">
            <UserSearchAndSelect
                excludedUsers={project.members.map((member) => member.userId)}
                onUserSelect={(user) => {
                    setUserId(user.id);
                }}
                onUserDeselect={() => {
                    setUserId("");
                }}
            />
            <div className="-mt-2 flex flex-col items-end">
                <SmartForm
                    action={createProjectMemberAction}
                    formSchema={z.object({
                        projectId: z.string().ulid(),
                        userId: z.string(),
                    })}
                    defaultValues={{
                        projectId: project.id,
                        userId: userId,
                    }}
                    values={{
                        projectId: project.id,
                        userId: userId,
                    }}
                    inputs={[
                        {
                            name: "projectId",
                            label: "Project ID",
                            type: "hidden",
                        },
                        {
                            name: "userId",
                            label: "User ID",
                            type: "hidden",
                        },
                    ]}
                    submitButton={{
                        icon: <Plus />,
                        label: "Add Member",
                    }}
                />
            </div>
        </div>
    );
};

export default ProjectCreateMemberForm;
