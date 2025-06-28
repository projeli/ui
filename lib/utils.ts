import { Toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormState } from "./types/form-types";
import { Notification } from "./types/notification-types";
import { Project, ProjectMember } from "./types/project-types";
import { ProjeliUser } from "./types/user-types";
import { Wiki, WikiMember } from "./types/wiki-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCdnUrl(url: string) {
  return `https://cdn.projeli.com/${url}`;
}

export function hasProjectPermission(user: ProjectMember, permission: bigint) {
  if (!user || !user.permissions || !permission) return false;
  const isOwner = user.isOwner;
  const userPermissions = BigInt(user.permissions);
  const permissionValue = BigInt(permission);
  return isOwner || (userPermissions & permissionValue) === permissionValue;
}

export function hasWikiPermission(
  user: WikiMember | undefined,
  permission: bigint
) {
  if (!user || !user.permissions || !permission) return false;
  const isOwner = user.isOwner;
  const userPermissions = BigInt(user.permissions);
  const permissionValue = BigInt(permission);
  return isOwner || (userPermissions & permissionValue) === permissionValue;
}

export function createFormToast(toast: ({}: Toast) => void, formState: FormState, successMessage: string = "Operation successful") {
  if (formState.success) {
    toast({
      description:
        formState.message || successMessage,
      variant: "success",
    });
  } else if (formState.success === false) {
    toast({
      description: formState.message || "An error occurred.",
      variant: "destructive",
    });
  }
}

export function getNotificationPerformer(notification: Notification, users: ProjeliUser[]) {
  const hasPerformerId = Object.prototype.hasOwnProperty.call(
    notification.body,
    "performerId"
  );

  if (!hasPerformerId) return undefined;

  return users.find((user) => user.id === (notification.body as any).performerId);
}

export function getProjectMember(
  userId: string,
  project: Project
): ProjectMember | undefined {
  if (!project || !project.members) return undefined;
  return project.members.find((member) => member.userId === userId);
}

export function getWikiMember(
  userId: string,
  wiki: Wiki
): WikiMember | undefined {
  if (!wiki || !wiki.members) return undefined;
  return wiki.members.find((member) => member.userId === userId);
}