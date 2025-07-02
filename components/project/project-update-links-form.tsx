"use client";

import { updateProjectLinksAction } from "@/actions/project/update-project-links";
import { useToast } from "@/hooks/use-toast";
import { Project, ProjectLink } from "@/lib/types/project-types";
import { createFormToast } from "@/lib/utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
    rectSortingStrategy,
    SortableContext,
    useSortable,
} from "@dnd-kit/sortable";
import {
    Bug,
    Code,
    Globe,
    GripVertical,
    Link,
    Save,
    Trash2,
    Users,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type ProjectUpdateLinksFormProps = {
    project: Project;
};

const ProjectUpdateLinksForm = ({ project }: ProjectUpdateLinksFormProps) => {
    const { toast } = useToast();
    const [formState, formAction, isLoading] = useActionState(
        updateProjectLinksAction,
        {}
    );
    const [links, setLinks] = useState<ProjectLink[]>(
        project.links.length > 0
            ? project.links
            : [
                  {
                      id: "",
                      projectId: project.id,
                      name: "",
                      url: "",
                      type: "Other",
                      order: 0,
                  },
              ]
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const linksData = links
            .map((link) => ({
                id: link.id || "",
                name: link.name,
                url: link.url,
                type: link.type,
            }))
            .filter((link) => link.name && link.url);
        formData.set("links", JSON.stringify(linksData));
        formAction(formData);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = links.findIndex((link) => link.id === active.id);
            const newIndex = links.findIndex((link) => link.id === over.id);
            setLinks((links) => {
                const newLinks = [...links];
                const [movedItem] = newLinks.splice(oldIndex, 1);
                newLinks.splice(newIndex, 0, movedItem);
                return newLinks;
            });
        }
    };

    useEffect(() => {
        createFormToast(toast, formState, "Links updated successfully.");
    }, [formState, toast]);

    return (
        <div className="grid gap-4 h-max">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input type="hidden" name="id" value={project.id} />
                <Card className="p-6 grid gap-6">
                    <div>
                        <h2 className="text-xl font-semibold">Links</h2>
                        <p className="text-muted-foreground text-sm">
                            Links help you provide additional resources and
                            references for your projects. It's a good idea to
                            add links to your project's repository,
                            documentation, or any other relevant resources.
                        </p>
                        <p className="text-muted-foreground text-sm mt-2">
                            You can add up to 10 links.
                        </p>
                    </div>
                    {formState.errors &&
                        formState.errors["links"] &&
                        formState.errors["links"].length > 0 && (
                            <div className="text-destructive text-sm">
                                {formState.errors["links"].map(
                                    (error, index) => (
                                        <p key={index}>{error}</p>
                                    )
                                )}
                            </div>
                        )}
                    <div className="flex flex-wrap gap-4">
                        <DndContext onDragEnd={handleDragEnd}>
                            <SortableContext
                                items={links.map((link) => link.id)}
                                strategy={rectSortingStrategy}
                            >
                                {links.map((link, index) => (
                                    <SortableItem key={link.id} id={link.id}>
                                        {(listeners) => (
                                            <Card className="p-4 flex flex-col gap-4 min-w-64 flex-1">
                                                <div className="flex">
                                                    <div
                                                        className="flex-1 flex justify-between items-center cursor-grab hover:bg-accent rounded-md px-2 hover:text-accent-foreground"
                                                        {...listeners}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <GripVertical className="size-4" />
                                                            <span className="text-sm">
                                                                {link.name ||
                                                                    "New Link"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="ml-2"
                                                            onClick={() => {
                                                                const updatedLinks =
                                                                    [...links];
                                                                updatedLinks.splice(
                                                                    index,
                                                                    1
                                                                );
                                                                setLinks(
                                                                    updatedLinks
                                                                );
                                                            }}
                                                        >
                                                            <Trash2 className="size-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label className="mb-2">
                                                        Type{" "}
                                                        <span className="text-destructive">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Select
                                                        value={link.type}
                                                        onValueChange={(
                                                            value
                                                        ) => {
                                                            const updatedLinks =
                                                                [...links];
                                                            updatedLinks[
                                                                index
                                                            ] = {
                                                                ...updatedLinks[
                                                                    index
                                                                ],
                                                                type: value,
                                                            };
                                                            setLinks(
                                                                updatedLinks
                                                            );
                                                        }}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Other">
                                                                <span className="flex items-center gap-2">
                                                                    <Link className="size-4" />{" "}
                                                                    Link
                                                                </span>
                                                            </SelectItem>
                                                            <SelectItem value="Website">
                                                                <span className="flex items-center gap-2">
                                                                    <Globe className="size-4" />{" "}
                                                                    Website
                                                                </span>
                                                            </SelectItem>
                                                            <SelectItem value="SourceCode">
                                                                <span className="flex items-center gap-2">
                                                                    <Code className="size-4" />{" "}
                                                                    Source Code
                                                                </span>
                                                            </SelectItem>
                                                            <SelectItem value="IssueTracker">
                                                                <span className="flex items-center gap-2">
                                                                    <Bug className="size-4" />{" "}
                                                                    Issue
                                                                    Tracker
                                                                </span>
                                                            </SelectItem>
                                                            <SelectItem value="Social">
                                                                <span className="flex items-center gap-2">
                                                                    <Users className="size-4" />{" "}
                                                                    Social
                                                                </span>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label className="mt-4 mb-2">
                                                        Name{" "}
                                                        <span className="text-destructive">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Name"
                                                        value={link.name}
                                                        onChange={(e) => {
                                                            const updatedLinks =
                                                                [...links];
                                                            updatedLinks[
                                                                index
                                                            ] = {
                                                                ...updatedLinks[
                                                                    index
                                                                ],
                                                                name: e.target
                                                                    .value,
                                                            };
                                                            setLinks(
                                                                updatedLinks
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="mb-2">
                                                        URL{" "}
                                                        <span className="text-destructive">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        type="url"
                                                        placeholder="https://example.com"
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const updatedLinks =
                                                                [...links];
                                                            updatedLinks[
                                                                index
                                                            ] = {
                                                                ...updatedLinks[
                                                                    index
                                                                ],
                                                                url: e.target
                                                                    .value,
                                                            };
                                                            setLinks(
                                                                updatedLinks
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </Card>
                                        )}
                                    </SortableItem>
                                ))}
                            </SortableContext>
                        </DndContext>
                        <Card className="p-4 flex flex-col gap-4 min-w-64 flex-1">
                            <button
                                type="button"
                                className="w-full h-full flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => {
                                    if (links.length >= 10) {
                                        toast({
                                            title: "Maximum links reached",
                                            description:
                                                "You can only add up to 10 links.",
                                            variant: "destructive",
                                        });
                                        return;
                                    }
                                    setLinks([
                                        ...links,
                                        {
                                            id: "",
                                            projectId: project.id,
                                            name: "",
                                            url: "",
                                            type: "Other",
                                            order: 0,
                                        },
                                    ]);
                                }}
                            >
                                <Link className="size-4" />
                                Add Link
                            </button>
                        </Card>
                    </div>
                    <div>
                        <Button
                            variant="default"
                            loading={isLoading}
                            icon={<Save />}
                        >
                            Save Links
                        </Button>
                    </div>
                </Card>
            </form>
        </div>
    );
};

type SortableItemProps = {
    id: string;
    children: (listeners: any) => React.ReactNode;
};

const SortableItem = ({ id, children }: SortableItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });
    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : "",
        transition,
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            {children(listeners)}
        </div>
    );
};

export default ProjectUpdateLinksForm;
