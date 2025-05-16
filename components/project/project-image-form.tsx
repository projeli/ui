"use client";

import { updateProjectImageAction } from "@/actions/project/update-project-image";
import ProfileImageForm from "../form/profile-image-form";

type ProjectImageFormProps = {
    projectId: string;
    projectImageComponent: React.ReactNode;
};

const ProjectImageForm = ({
    projectId,
    projectImageComponent,
}: ProjectImageFormProps) => {
    return (
        <ProfileImageForm
            title="Project picture"
            description="PNG, JPG, WEBP up to 2MB"
            note="It may take a few hours for your project's picture to update due to caching."
            buttonText="Upload New"
            acceptedFormats={["image/jpeg", "image/png", "image/webp"]}
            imageComponent={projectImageComponent}
            action={updateProjectImageAction}
            hiddenInputs={{ id: projectId }}
        />
    );
};

export default ProjectImageForm;
