import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProjectMember } from "./types/project-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCdnUrl(url: string) {
  return `https://cdn.projeli.com/${url}`;
}

export function hasProjectPermission(user: ProjectMember, permission: bigint) {
  const isOwner = user.isOwner;
  const userPermissions = BigInt(user.permissions);
  const permissionValue = BigInt(permission);
  return isOwner || (userPermissions & permissionValue) === permissionValue;
}
