"use client";

import { useToast } from "@/hooks/use-toast";
import { FormState, ServerAction } from "@/lib/types/form-types";
import { createFormToast } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import FormValidationMessage from "../form/form-validation-message";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface ImageUploadDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    acceptedFormats?: string[];
    action: ServerAction;
    hiddenInputs?: Record<string, string>;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
    isOpen,
    onClose,
    title = "Upload an Image",
    description = "Drag and drop an image here or click to select a file.",
    acceptedFormats = ["image/jpeg", "image/png", "image/gif"],
    action,
    hiddenInputs = {},
}) => {
    const { toast } = useToast();

    const [image, setImage] = useState<File | null>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && acceptedFormats.includes(droppedFile.type)) {
            setImage(droppedFile);
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
            toast({
                description: "File size exceeds 2MB.",
                variant: "destructive",
            });
            setImage(null);
            return;
        }
        if (selectedFile && acceptedFormats.includes(selectedFile.type)) {
            setImage(selectedFile);
        }
    };

    const removeImage = () => {
        setImage(null);
        const input = document.getElementById(
            "image-file-upload-input"
        ) as HTMLInputElement;
        if (input) {
            input.value = "";
        }
    };

    const [formState, formAction, isLoading] = useActionState<
        FormState,
        FormData
    >(action, {});

    useEffect(() => {
        if (formState.success) {
            onClose();
        }
    }, [formState]);

    useEffect(() => {
        setImage(null);
    }, [onClose]);

    useEffect(() => {
        createFormToast(toast, formState, "Image uploaded successfully.");
    }, [formState, toast]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <form
                    id="image-upload-form"
                    action={formAction}
                    className="w-full"
                >
                    {Object.entries(hiddenInputs).map(([key, value]) => (
                        <input
                            key={key}
                            type="hidden"
                            name={key}
                            value={value}
                        />
                    ))}
                    <p className="text-sm mb-4">{description}</p>
                    <div className="mb-4">
                        <FormValidationMessage
                            formState={formState}
                            id="image"
                        />
                    </div>
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="border-2 relative border-dashed border-base-content rounded-lg p-4 text-center cursor-pointer hover:bg-base-300"
                    >
                        <input
                            id="image-file-upload-input"
                            required={true}
                            name="image"
                            type="file"
                            className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                            accept={acceptedFormats.join(",")}
                            onChange={handleFileSelect}
                        />
                        <label>
                            {image ? (
                                <p className="text-sm text-success">
                                    Image selected!
                                </p>
                            ) : (
                                "Drag and drop an image here, or click to browse."
                            )}
                        </label>
                    </div>
                    {image && (
                        <div className="mt-4 flex gap-4 relative">
                            <Button
                                variant="destructive"
                                className="absolute top-0 left-0 rounded hover:bg-destructive/50 bg-transparent hover:opacity-100 opacity-0 size-12"
                                onClick={removeImage}
                                icon={<X />}
                            />
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="size-12 object-cover rounded"
                            />
                            <p>
                                {image.name} ({Math.round(image.size / 1024)}{" "}
                                KB)
                            </p>
                        </div>
                    )}
                    <div className="mt-4 flex justify-end">
                        <Button
                            disabled={!image}
                            type="submit"
                            loading={isLoading}
                            icon={<Upload />}
                        >
                            Upload
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ImageUploadDialog;
