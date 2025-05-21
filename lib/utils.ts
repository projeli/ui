import { Toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormState } from "./types/form-types";
import { ProjectMember } from "./types/project-types";
import { WikiMember } from "./types/wiki-types";

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
  user: WikiMember,
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
