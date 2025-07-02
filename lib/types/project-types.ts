export type Project = {
    id: string;
    name: string;
    slug: string;
    summary: string;
    content: string;
    imageUrl: string;
    category: ProjectCategory;
    tags: ProjectTag[];
    status: ProjectStatus;
    members: ProjectMember[];
    links: ProjectLink[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type ProjectMember = {
    id: string;
    projectId: string;
    userId: string;
    isOwner: boolean;
    role: string;
    permissions: string;
};

export type ProjectLink = {
    id: string;
    projectId: string;
    name: string;
    url: string;
    type: ProjectLinkType;
    order: number;
};

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectLinkType = (typeof projectLinkTypes)[number];

export type ProjectTag = {
    id: string;
    name: string;
};

export type ProjectStatus = (typeof projectStatuses)[number];

export const ProjectMemberPermissions = {
    None: 0n,
    EditProject: 1n << 0n,
    PublishProject: 1n << 1n,
    ArchiveProject: 1n << 2n,
    ManageLinks: 1n << 3n,
    ManageTags: 1n << 4n,
    // Reserved (5 - 10) for future project-level permissions

    AddProjectMembers: 1n << 11n,
    EditProjectMemberRoles: 1n << 12n,
    EditProjectMemberPermissions: 1n << 13n,
    // Reserved (14 - 19) for future member-level permissions

    DeleteProjectMembers: 1n << 20n,

    DeleteProject: 1n << 63n,
    All: (1n << 64n) - 1n
} as const;

export type ProjectMemberPermissions = bigint;

export const projectCategories: string[] = [
    "Adventure",
    "Animation",
    "Art",
    "Business",
    "Cooking",
    "Crafts",
    "Design",
    "DIY",
    "Education",
    "Electronics",
    "Environment",
    "Fashion",
    "Film",
    "Finance",
    "Gaming",
    "Health",
    "History",
    "Hobbies",
    "Journalism",
    "Languages",
    "Literature",
    "Music",
    "Nature",
    "Photography",
    "Programming",
    "Psychology",
    "Robotics",
    "Science",
    "Space",
    "Sports",
    "Technology",
    "Travel",
    "Tutorials",
    "WebDevelopment",
    "Wellness",
    "Writing",
    "Other",
];

export const projectLinkTypes: string[] = [
    "Other",
    "Website",
    "SourceCode",
    "Documentation",
    "IssueTracker",
    "Social",
];

export const projectStatuses: string[] = [
    "Draft",
    "Review",
    "Published",
    "Archived",
];
