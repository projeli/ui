export type Wiki = {
    id: string;
    projectId: string;
    projectSlug: string;
    projectName: string;
    name: string;
    content: string;
    config: WikiConfig;
    status: WikiStatus;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    members: WikiMember[];
    categories: WikiCategory[];
    pages: WikiPage[];
};

export type WikiConfig = {
    sidebar: WikiSidebar;
};

export type WikiSidebar = {
    items: WikiSidebarItem[];
};

export type WikiSidebarItem = {
    index: string;
    title: string;
    slug?: string;
    category?: WikiSidebarItem[];
};

export type WikiMember = {
    id: string;
    wikiId: string;
    userId: string;
    isOwner: boolean;

    wiki: Wiki;
    pages: WikiPage[];
    pageVersions: WikiPageVersion[];
};

export type WikiCategory = {
    id: string;
    wikiId: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;

    wiki: Wiki;
    pages: WikiPage[];
};

export type WikiPage = {
    id: string;
    wikiId: string;
    title: string;
    slug: string;
    content: string;
    status: WikiPageStatus;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;

    wiki: Wiki;
    categories: WikiCategory[];
    versions: WikiPageVersion[];
    editors: WikiMember[];
};

export type WikiPageVersion = {
    id: string;
    pageId: string;
    version: number;
    summary: string;
    content: string;
    difference: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;

    page: WikiPage;
    editors: WikiMember[];
};

export type WikiStatus = (typeof wikiStatuses)[number];

export const wikiStatuses: string[] = [
    "Uncreated",
    "Draft",
    "Published",
    "Archived",
];

export type WikiPageStatus = (typeof wikiPageStatuses)[number];

export const wikiPageStatuses: string[] = ["Draft", "Published", "Archived"];
