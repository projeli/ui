export type Project = {
    id: string;
    name: string;
    slug: string;
    summary: string;
    content: string;
    imageUrl: string;
    category: ProjectCategory;
    tags: ProjectTag[];
    isPublished: boolean;
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
    type: string;
};

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectLinkType = (typeof projectLinkTypes)[number];

export type ProjectTag = {
    id: string;
    name: string;
};

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
