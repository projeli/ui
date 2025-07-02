"use client";

import { ServerAction } from "@/lib/types/form-types";
import { Upload } from "lucide-react";
import { useState } from "react";
import ImageUploadDialog from "../dialog/image-upload-dialog";
import { Button } from "../ui/button";

type ProfileImageFormProps = {
    title: string;
    description: string;
    note: string;
    buttonText: string;
    acceptedFormats: string[];
    imageComponent: React.ReactNode;
    action: ServerAction;
    hiddenInputs?: Record<string, string>;
};

const ProfileImageForm = ({
    title,
    description,
    note,
    buttonText,
    acceptedFormats,
    imageComponent,
    action,
    hiddenInputs = {},
}: ProfileImageFormProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="grid lg:grid-cols-[96px_1fr_max-content] items-center gap-4">
                <div>{imageComponent}</div>
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <h3 className="text-base font-semibold">{title}</h3>
                        <p className="text-sm">{description}</p>
                    </div>
                    <div>
                        <p className="text-xs">{note}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="default"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Upload />
                        {buttonText}
                    </Button>
                </div>
            </div>
            <ImageUploadDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Upload ${title}`}
                description={description}
                acceptedFormats={acceptedFormats}
                action={action}
                hiddenInputs={hiddenInputs}
            />
        </>
    );
};

export default ProfileImageForm;
