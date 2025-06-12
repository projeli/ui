export type Wiki = {
    id: string;
    projectId: string;
    projectSlug: string;
    projectName: string;
    projectImageUrl: string;
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
    permissions: string;

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

export type WikiStatistics = {
    wikiId: string;
    pageCount: number;
    categoryCount: number;
    memberCount: number;
}

export type WikiStatus = (typeof wikiStatuses)[number];

export const WikiMemberPermissions = {
    None: 0n,
    EditWikiMemberPermissions: 1n << 0n,
    EditWiki: 1n << 1n,

    CreateWikiPages: 1n << 11n,
    EditWikiPages: 1n << 12n,
    PublishWikiPages: 1n << 13n,

    DeleteWikiPages: 1n << 20n,

    CreateWikiCategories: 1n << 21n,
    EditWikiCategories: 1n << 22n,
    DeleteWikiCategories: 1n << 30n,

    DeleteWiki: 1n << 63n,
    All: (1n << 64n) - 1n
} as const;

export type WikiMemberPermissions = bigint;

export const wikiStatuses: string[] = [
    "Draft",
    "Published",
    "Archived",
];

export type WikiPageStatus = (typeof wikiPageStatuses)[number];

export const wikiPageStatuses: string[] = ["Draft", "Published", "Archived"];

type Event<EventType> = {
    $type: EventType;
    timestamp: string;
    userId: string;
} 


// Wiki Events
export type WikiCreatedEvent = Event<"WikiCreatedEvent"> & {
    status: WikiStatus;
}

export type WikiUpdatedContentEvent = Event<"WikiUpdatedContentEvent"> & {
    content: string;
}

export type WikiUpdatedOwnershipEvent = Event<"WikiUpdatedOwnershipEvent"> & {
    toUserId: string;
}

export type WikiUpdatedSidebarEvent = Event<"WikiUpdatedSidebarEvent"> & {
    sidebar: WikiSidebar;
}

export type WikiUpdatedStatusEvent = Event<"WikiUpdatedStatusEvent"> & {
    status: WikiStatus;
}



// Wiki Page Events
export type WikiPageEvent<EventType> = Event<EventType> & {
    wikiPageId: string;
}

export type WikiPageCreatedEvent = WikiPageEvent<"WikiPageCreatedEvent"> & {
    title: string;
    slug: string;
}

export type WikiPageDeletedEvent = WikiPageEvent<"WikiPageDeletedEvent">

export type WikiPageUpdatedCategoriesEvent = WikiPageEvent<"WikiPageUpdatedCategoriesEvent"> & {
    categories: {
        id: string;
        name: string;
        slug: string;
        description: string;
    }[];
}

export type WikiPageUpdatedContentEvent = Event<"WikiPageUpdatedContentEvent"> & {
    wikiPageId: string;
    content: string;
}

export type WikiPageUpdatedDetailsEvent = Event<"WikiPageUpdatedDetailsEvent"> & {
    wikiPageId: string;
    title: string;
    slug: string;
}

export type WikiPageUpdatedStatusEvent = Event<"WikiPageUpdatedStatusEvent"> & {
    wikiPageId: string;
    status: WikiPageStatus;
}



// Wiki Category Events
export type WikiCategoryEvent<EventType> = Event<EventType> & {
    categoryId: string;
}

export type WikiCategoryCreatedEvent = WikiCategoryEvent<"WikiCategoryCreatedEvent"> & {
    name: string;
    slug: string;
    description: string;
}

export type WikiCategoryDeletedEvent = WikiCategoryEvent<"WikiCategoryDeletedEvent">

export type WikiCategoryUpdatedEvent = WikiCategoryEvent<"WikiCategoryUpdatedEvent"> & {
    name: string;
    slug: string;
    description: string;
}



// Wiki Member Events
export type WikiMemberEvent<EventType> = Event<EventType> & {
    memberId: string;
}

export type WikiMemberAddedEvent = WikiMemberEvent<"WikiMemberAddedEvent">

export type WikiMemberRemovedEvent = WikiMemberEvent<"WikiMemberRemovedEvent">

export type WikiMemberUpdatedPermissionsEvent = WikiMemberEvent<"WikiMemberUpdatedPermissionsEvent"> & {
    permissions: WikiMemberPermissions;
}

export type WikiEvent = WikiCreatedEvent 
    | WikiUpdatedContentEvent
    | WikiUpdatedOwnershipEvent
    | WikiUpdatedSidebarEvent
    | WikiUpdatedStatusEvent
    | WikiPageCreatedEvent
    | WikiPageDeletedEvent
    | WikiPageUpdatedCategoriesEvent
    | WikiPageUpdatedContentEvent
    | WikiPageUpdatedDetailsEvent
    | WikiPageUpdatedStatusEvent
    | WikiCategoryCreatedEvent
    | WikiCategoryDeletedEvent
    | WikiCategoryUpdatedEvent
    | WikiMemberAddedEvent
    | WikiMemberRemovedEvent
    | WikiMemberUpdatedPermissionsEvent;

export type WikiEventType = WikiEvent["$type"];

export const wikiEventNames: Record<WikiEventType, string> = {
    "WikiCreatedEvent": "Wiki Created",
    "WikiUpdatedContentEvent": "Wiki Content Updated",
    "WikiUpdatedOwnershipEvent": "Wiki Ownership Updated",
    "WikiUpdatedSidebarEvent": "Wiki Sidebar Updated",
    "WikiUpdatedStatusEvent": "Wiki Status Updated",

    "WikiPageCreatedEvent": "Page Created",
    "WikiPageDeletedEvent": "Page Deleted",
    "WikiPageUpdatedCategoriesEvent": "Page Categories Updated",
    "WikiPageUpdatedContentEvent": "Page Content Updated",
    "WikiPageUpdatedDetailsEvent": "Page Details Updated",
    "WikiPageUpdatedStatusEvent": "Page Status Updated",

    "WikiCategoryCreatedEvent": "Wiki Category Created",
    "WikiCategoryDeletedEvent": "Wiki Category Deleted",
    "WikiCategoryUpdatedEvent": "Wiki Category Updated",

    "WikiMemberAddedEvent": "Member Added",
    "WikiMemberRemovedEvent": "Member Removed",
    "WikiMemberUpdatedPermissionsEvent": "Member Permissions Updated"
};

export type EventGroupCategory = (typeof eventGroupCategories)[number];

export const eventGroupCategories: string[] = [
    "wiki",
    "wikiPage",
    "wikiMember",
    "wikiCategory",
];

export const eventGroupCategoriesTypes: Record<
    EventGroupCategory,
    WikiEventType[]
> = {
    wiki: [
        "WikiCreatedEvent",
        "WikiUpdatedContentEvent",
        "WikiUpdatedOwnershipEvent",
        "WikiUpdatedSidebarEvent",
        "WikiUpdatedStatusEvent",
    ],
    wikiPage: [
        "WikiPageCreatedEvent",
        "WikiPageDeletedEvent",
        "WikiPageUpdatedCategoriesEvent",
        "WikiPageUpdatedContentEvent",
        "WikiPageUpdatedDetailsEvent",
        "WikiPageUpdatedStatusEvent",
    ],
    wikiMember: [
        "WikiMemberAddedEvent",
        "WikiMemberRemovedEvent",
        "WikiMemberUpdatedPermissionsEvent",
    ],
    wikiCategory: [
        "WikiCategoryCreatedEvent",
        "WikiCategoryDeletedEvent",
        "WikiCategoryUpdatedEvent",
    ],
} as const;