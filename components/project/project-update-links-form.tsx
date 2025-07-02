"use client";

import { updateProjectLinksAction } from "@/actions/project/update-project-links";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import useFormActionState from "@/lib/hooks/form-hook";
import {
    Project,
    ProjectLink,
    projectLinkTypes,
} from "@/lib/types/project-types";
import { createFormToast } from "@/lib/utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
    rectSortingStrategy,
    SortableContext,
    useSortable,
} from "@dnd-kit/sortable";
import _ from "lodash";
import { GripVertical, Link as LinkIcon, Save, Trash2 } from "lucide-react";
import * as React from "react";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import ProjectLinkIcon from "./project-link-icon";

export type ProjectLinkInput = Omit<ProjectLink, "order"> & { order: number };

interface FormValues {
    id: string;
    links: ProjectLinkInput[];
}

type Props = { project: Project };

export default function ProjectUpdateLinksForm({ project }: Props) {
    console.log("ProjectUpdateLinksForm rendered with project:", project);

    const { toast } = useToast();
    const [form, handleSubmit, formState, isLoading] = useFormActionState(
        updateProjectLinksAction,
        z.object({
            id: z.string(),
            links: z
                .array(
                    z.object({
                        id: z.string().optional(),
                        projectId: z.string(),
                        name: z
                            .string()
                            .min(2, "Name must be at least 2 characters")
                            .max(16, "Name must be at most 16 characters"),
                        url: z
                            .string()
                            .url("Invalid URL")
                            .min(1, "URL is required")
                            .max(256, "URL must be at most 256 characters"),
                        type: z.enum([
                            "Other",
                            "Website",
                            "SourceCode",
                            "Documentation",
                            "IssueTracker",
                            "Social",
                        ]),
                        order: z.number(),
                    })
                )
                .max(10, "Up to 10 links allowed")
                .refine((links) => {
                    const uniqueNames = new Set(links.map((l) => l.name));
                    return uniqueNames.size === links.length;
                }, "Link names must be unique"),
        }),
        {
            id: project.id,
            links:
                project.links.length > 0
                    ? project.links.map((l, i) => ({ ...l, order: i }))
                    : [
                          {
                              id: "",
                              projectId: project.id,
                              name: "",
                              url: "",
                              type: "Other",
                              order: 0,
                          },
                      ],
        }
    );

    const { fields, append, remove, move } = useFieldArray({
        control: form.control,
        name: "links",
    });

    React.useEffect(() => {
        createFormToast(toast, formState, "Links updated successfully.");
    }, [formState, toast]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);
            move(oldIndex, newIndex);
        }
    };

    React.useEffect(() => {
        if (formState.errors) {
            for (const key in formState.errors) {
                form.setError(key as any, {
                    type: "server",
                    message: formState.errors[key].join(", "),
                });
            }
        }
    }, [formState]);

    return (
        <div className="grid gap-4">
            <Form {...form}>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    {/* Drag & Drop List */}
                    <Card className="@container p-6 grid gap-6">
                        <div>
                            <h2 className="text-xl font-semibold">Links</h2>
                            <p className="text-sm text-muted-foreground">
                                Provide additional resources for your project.
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Up to 10 links.
                            </p>
                        </div>

                        {formState.errors?.links && (
                            <div className="text-sm text-destructive">
                                {formState.errors.links.map(
                                    (msg: string, i: number) => (
                                        <p key={i}>{msg}</p>
                                    )
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
                            <DndContext onDragEnd={handleDragEnd}>
                                <SortableContext
                                    items={fields.map((f) => f.id)}
                                    strategy={rectSortingStrategy}
                                >
                                    {fields.map((field, idx) => (
                                        <div
                                            key={field.id}
                                            className="min-w-64 flex-1"
                                        >
                                            <SortableItem id={field.id}>
                                                {(listeners) => (
                                                    <Card className="p-4 flex flex-col gap-4">
                                                        <div className="flex">
                                                            <div
                                                                className="flex-1 flex justify-between items-center cursor-grab hover:bg-accent rounded-md px-2 hover:text-accent-foreground"
                                                                {...listeners}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <GripVertical className="size-4" />
                                                                    <span className="text-sm">
                                                                        {form.watch(
                                                                            `links.${idx}.name`
                                                                        ) ||
                                                                            "New Link"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    remove(idx)
                                                                }
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </Button>
                                                        </div>

                                                        {/* Type */}
                                                        <FormField
                                                            control={
                                                                form.control
                                                            }
                                                            name={
                                                                `links.${idx}.type` as const
                                                            }
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormLabel>
                                                                        Type
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Select
                                                                            onValueChange={
                                                                                field.onChange
                                                                            }
                                                                            value={
                                                                                field.value
                                                                            }
                                                                            name={
                                                                                field.name
                                                                            }
                                                                            disabled={
                                                                                field.disabled
                                                                            }
                                                                        >
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select type" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {projectLinkTypes.map(
                                                                                    (
                                                                                        type
                                                                                    ) => (
                                                                                        <SelectItem
                                                                                            value={
                                                                                                type
                                                                                            }
                                                                                            key={
                                                                                                type
                                                                                            }
                                                                                        >
                                                                                            <span className="flex items-center gap-2">
                                                                                                <ProjectLinkIcon
                                                                                                    type={
                                                                                                        type
                                                                                                    }
                                                                                                />
                                                                                                {_.startCase(
                                                                                                    type
                                                                                                )}
                                                                                            </span>
                                                                                        </SelectItem>
                                                                                    )
                                                                                )}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        {/* Name */}
                                                        <FormField
                                                            control={
                                                                form.control
                                                            }
                                                            name={`links.${idx}.name`}
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormLabel>
                                                                        Name
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="Name"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        {/* URL */}
                                                        <FormField
                                                            control={
                                                                form.control
                                                            }
                                                            name={
                                                                `links.${idx}.url` as const
                                                            }
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormLabel>
                                                                        URL
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="https://example.com"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </Card>
                                                )}
                                            </SortableItem>
                                        </div>
                                    ))}

                                    {/* Add Link Button */}
                                    <Card className="p-4 flex items-center justify-center min-w-64 flex-1">
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                            onClick={() => {
                                                if (fields.length >= 10) {
                                                    toast({
                                                        title: "Maximum links reached",
                                                        description:
                                                            "Up to 10 links allowed.",
                                                        variant: "destructive",
                                                    });
                                                    return;
                                                }
                                                append({
                                                    id: "",
                                                    projectId: project.id,
                                                    name: "",
                                                    url: "",
                                                    type: "Other",
                                                    order: fields.length,
                                                });
                                            }}
                                        >
                                            <LinkIcon className="size-4" /> Add
                                            Link
                                        </button>
                                    </Card>
                                </SortableContext>
                            </DndContext>
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
            </Form>
        </div>
    );
}

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
