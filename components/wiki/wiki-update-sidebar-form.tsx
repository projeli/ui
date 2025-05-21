"use client";

import { updateWikiSidebarAction } from "@/actions/wiki/update-wiki-sidebar";
import { Wiki, WikiPage, WikiSidebarItem } from "@/lib/types/wiki-types";
import { cn } from "@/lib/utils";
import { Save, X } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import {
    StaticTreeDataProvider,
    Tree,
    TreeItem,
    TreeItemIndex,
    UncontrolledTreeEnvironment,
} from "react-complex-tree";
import "react-complex-tree/lib/style-modern.css";
import FormAlert from "../form/form-alert";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

type WikiUpdateSidebarFormProps = {
    wiki: Wiki;
    pages: WikiPage[];
};

const ITEMS_PER_PAGE = 10;

const WikiUpdateSidebarForm = ({
    wiki,
    pages: initialPages,
}: WikiUpdateSidebarFormProps) => {
    const [availablePages, setAvailablePages] = useState(initialPages);

    const generateSidebarItems = (
        items: WikiSidebarItem[],
        flatList: Record<TreeItemIndex, TreeItem<any>>
    ) => {
        items.forEach((item) => {
            const isFolder = !!item.category && item.category.length > 0;

            flatList[item.index] = {
                data: item.title,
                index: item.index,
                children: isFolder
                    ? item.category?.map((child) => child.index)
                    : undefined,
                isFolder,
                canRename: true,
            };

            if (isFolder) {
                generateSidebarItems(item.category!, flatList);
            }
        });
        return flatList;
    };

    const sidebarItems = generateSidebarItems(
        wiki.config?.sidebar?.items || [],
        {}
    );

    useEffect(() => {
        const filteredPages = availablePages.filter(
            (page) => sidebarItems[page.id] === undefined
        );
        if (
            filteredPages.length !== availablePages.length ||
            filteredPages.some((page, index) => page !== availablePages[index])
        ) {
            setAvailablePages(filteredPages);
        }
    }, [sidebarItems, availablePages]);

    const initialItems: { [key: string]: any } = {
        root: {
            index: "root",
            isFolder: true,
            children:
                wiki.config?.sidebar?.items?.map((item) => item.index) || [],
            data: wiki.name,
        },
        ...sidebarItems,
    };

    const [formState, formAction, isLoading] = useActionState(
        updateWikiSidebarAction,
        {}
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filterPages = (pages: WikiPage[], query: string) =>
        pages.filter((page) =>
            page.title.toLowerCase().includes(query.toLowerCase())
        );

    const filteredAvailable = filterPages(availablePages, searchQuery);
    const availableTotalPages = Math.ceil(
        filteredAvailable.length / ITEMS_PER_PAGE
    );
    const availableStart = (currentPage - 1) * ITEMS_PER_PAGE;
    const availableEnd = availableStart + ITEMS_PER_PAGE;
    const paginatedPages = filteredAvailable.slice(
        availableStart,
        availableEnd
    );

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleNext = () => {
        if (currentPage < availableTotalPages) setCurrentPage(currentPage + 1);
    };

    const [items, setItems] = useState(initialItems);

    const addFolder = () => {
        const id = `folder-${Date.now()}`;
        items[id] = {
            data: "New Folder",
            index: id,
            children: [],
            isFolder: true,
            canRename: true,
        } as TreeItem;
        items.root.children.push(id);
        setItems({ ...items });
    };

    const addItem = (page: WikiPage) => {
        const id = page.id;
        items[id] = {
            data: page.title,
            index: id,
            canRename: false,
        };
        items.root.children.push(id);
        setItems({ ...items });
        setAvailablePages(availablePages.filter((p) => p.id !== page.id));
    };

    const onDelete = (item: TreeItem) => {
        if (item.isFolder) {
            const getChildren = (index: TreeItemIndex): TreeItemIndex[] => {
                if (
                    !items[index] ||
                    !items[index].isFolder ||
                    !items[index].children
                ) {
                    return [];
                }
                const children = items[index].children;
                return children.reduce(
                    (acc: TreeItemIndex[], child: TreeItemIndex) => {
                        if (items[child].isFolder) {
                            return [...acc, ...getChildren(child)];
                        }
                        return [...acc, child];
                    },
                    []
                );
            };

            const children = getChildren(item.index);

            setAvailablePages(
                [
                    ...availablePages,
                    ...initialPages.filter((page) =>
                        children.includes(page.id)
                    ),
                ].sort((x, y) => {
                    if (x.title < y.title) return -1;
                    if (x.title > y.title) return 1;
                    return 0;
                })
            );

            removeChild(item.index);
        } else {
            const page = initialPages.find((p) => p.id === item.index);

            if (page) {
                setAvailablePages(
                    [...availablePages, page].sort((x, y) => {
                        if (x.title < y.title) return -1;
                        if (x.title > y.title) return 1;
                        return 0;
                    })
                );
            }

            removeChild(item.index);
        }

        setItems({ ...items });
    };

    const removeChild = (index: TreeItemIndex) => {
        const parent = getParent(index);
        if (parent) {
            parent.children = parent.children?.filter(
                (child) => child !== index
            );
            setItems({ ...items });
        }
    };

    const getParent = (index: TreeItemIndex): TreeItem | null => {
        const keys = Object.keys(items);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const item = items[key];
            if (item.children.includes(index)) {
                return item;
            }
        }
        return null;
    };

    const onSave = () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("id", wiki.id);
            formData.append(
                "sidebar",
                JSON.stringify({
                    items: getSidebarItems(items),
                })
            );
            formAction(formData);
        });
    };

    const getSidebarItems = (
        items: Record<TreeItemIndex, TreeItem<any>>
    ): WikiSidebarItem[] => {
        const sidebarItems: WikiSidebarItem[] = [];
        const root = items.root;
        if (root.children) {
            root.children.forEach((child) => {
                const item = items[child];
                if (item.isFolder) {
                    sidebarItems.push({
                        index: item.index as string,
                        title: item.data,
                        category: getChildren(item.index),
                    });
                } else {
                    sidebarItems.push({
                        index: item.index as string,
                        title: item.data,
                        slug: initialPages.find((p) => p.id === item.index)
                            ?.slug,
                    });
                }
            });
        }
        return sidebarItems;
    };

    const getChildren = (index: TreeItemIndex): WikiSidebarItem[] => {
        const children = items[index].children;
        return children.reduce(
            (acc: WikiSidebarItem[], child: TreeItemIndex) => {
                const item = items[child];
                if (item.isFolder) {
                    return [
                        ...acc,
                        {
                            index: item.index,
                            title: item.data,
                            category: getChildren(item.index),
                        },
                    ];
                }
                return [
                    ...acc,
                    {
                        index: item.index,
                        title: item.data,
                        slug: initialPages.find((p) => p.id === item.index)
                            ?.slug,
                    },
                ];
            },
            []
        );
    };

    return (
        <div className="grid gap-4">
            <FormAlert formState={formState} />
            <div className="border-b pb-4 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h3 className="text-lg font-semibold">Sidebar</h3>
                    <p className="text-base text-muted-foreground">
                        Customize the sidebar of the {wiki.projectName} wiki.
                    </p>
                </div>
                <div className="grow md:grow-0">
                    <Button
                        variant="default"
                        className="w-full md:w-max"
                        onClick={onSave}
                        loading={isLoading}
                        icon={<Save />}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:ml-4">
                <div className="flex flex-col gap-4 h-full">
                    <div className="grid gap-4 pb-4 border-b">
                        <div>
                            <h2 className="font-semibold">Sidebar Layout</h2>
                            <p className="text-sm text-muted-foreground">
                                Drag and drop items to rearrange the sidebar
                                layout. Press F2 to rename folders.
                            </p>
                        </div>
                        <Button onClick={addFolder}>Add Folder</Button>
                    </div>
                    <SidebarTree items={items} onDelete={onDelete} />
                </div>
                <div className="grid gap-4 h-max">
                    <div className="grid gap-4 pb-4 border-b">
                        <div>
                            <h2 className="font-semibold">Available Pages</h2>
                            <p className="text-sm text-muted-foreground">
                                Click on pages to add them to the sidebar. Use
                                the search bar to filter pages.
                            </p>
                        </div>
                        <Input
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search pages..."
                        />
                    </div>
                    <div>
                        <div className="grid gap-2">
                            {paginatedPages.length === 0 ? (
                                <p className="text-muted-foreground">
                                    {searchQuery
                                        ? "No matching categories found"
                                        : "No categories available"}
                                </p>
                            ) : (
                                paginatedPages.map((page) => (
                                    <SortablePageItem
                                        key={page.id}
                                        page={{
                                            index: page.id,
                                            title: page.title,
                                            slug: page.slug,
                                        }}
                                        onClick={() => addItem(page)}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    {availableTotalPages > 1 && (
                        <div className="flex items-center justify-between mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {currentPage} of {availableTotalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleNext}
                                disabled={currentPage === availableTotalPages}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

type PageItemProps = {
    page: WikiSidebarItem;
    onClick?: () => void;
};

const SortablePageItem = ({ page, onClick }: PageItemProps) => {
    return (
        <Card
            className="py-2 px-4 flex gap-2 items-center bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer"
            onClick={onClick}
        >
            <p>{page.title}</p>
        </Card>
    );
};
type SidebarTreeProps = {
    items: Record<TreeItemIndex, TreeItem<any>>;
    onDelete: (item: TreeItem) => void;
};

const SidebarTree = ({ items, onDelete }: SidebarTreeProps) => {
    return (
        <div>
            <style>{`
            .rct-tree-item-button {
                font-family: "Poppins", sans-serif;
                font-size: 1rem;
                border: 1px solid hsl(var(--border));
                background-color: hsl(var(--background));
            }
            .rct-tree-root {
                padding: 0;
            }
            :root {
                --rct-color-tree-bg: transparent;
                --rct-item-height: 42px;

                --rct-color-tree-focus-outline: transparent;
                --rct-item-margin: 4px;
                --rct-item-padding: 8px;
                --rct-radius: var(--radius);
                --rct-bar-offset: 0px;
                --rct-bar-width: 0px;
                --rct-bar-color: hsl(var(--primary));
                --rct-focus-outline: hsl(var(--primary));

                --rct-color-focustree-item-selected-bg: hsl(var(--background));
                --rct-color-focustree-item-hover-bg: hsl(var(--accent));
                --rct-color-focustree-item-hover-text: "Poppins, sans-serif";
                --rct-color-focustree-item-active-bg: hsl(var(--muted));
                --rct-color-focustree-item-active-text: currentColor;

                --rct-color-arrow: currentColor;
                --rct-arrow-size: 12px;
                --rct-arrow-container-size: 16px;
                --rct-arrow-padding: 6px;

                --rct-cursor: pointer;

                --rct-color-focustree-item-selected-text: inherit;
                --rct-color-focustree-item-focused-border: hsl(var(--primary));
                --rct-color-focustree-item-draggingover-bg: hsl(var(--accent));
                --rct-color-focustree-item-draggingover-color: inherit;

                --rct-color-nonfocustree-item-selected-bg: hsl(var(--accent));
                --rct-color-nonfocustree-item-selected-text: inherit;
                --rct-color-nonfocustree-item-focused-border: hsl(var(--accent));

                --rct-color-drag-between-line-bg: hsl(var(--primary));
            }
          `}</style>
            <UncontrolledTreeEnvironment
                dataProvider={
                    new StaticTreeDataProvider(items, (item, newName) => ({
                        ...item,
                        data: newName,
                    }))
                }
                getItemTitle={(item) => item.data}
                viewState={{}}
                canDragAndDrop={true}
                canDropOnFolder={true}
                canReorderItems={true}
                canDropAt={(items, target) =>
                    !(items.some((item) => item.isFolder) && target.depth > 0)
                }
            >
                <Tree
                    treeId="sidebar-layout"
                    rootItem="root"
                    treeLabel="Sidebar Layout"
                    renderItem={({
                        item,
                        depth,
                        children,
                        title,
                        context,
                        arrow,
                    }) => {
                        const InteractiveComponent = context.isRenaming
                            ? "div"
                            : "div";
                        const type = context.isRenaming ? undefined : "div";
                        return (
                            <li
                                {...(context.itemContainerWithChildrenProps as any)}
                                className={cn(
                                    "rct-tree-item-li",
                                    item.isFolder &&
                                        "rct-tree-item-li-isFolder",
                                    context.isSelected &&
                                        "rct-tree-item-li-selected",
                                    context.isExpanded &&
                                        "rct-tree-item-li-expanded",
                                    context.isFocused &&
                                        "rct-tree-item-li-focused",
                                    context.isDraggingOver &&
                                        "rct-tree-item-li-dragging-over",
                                    context.isSearchMatching &&
                                        "rct-tree-item-li-search-match"
                                )}
                            >
                                <div
                                    {...(context.itemContainerWithoutChildrenProps as any)}
                                    style={{
                                        "--depthOffset": `${depth * 24}px`,
                                    }}
                                    className={cn(
                                        "rct-tree-item-title-container",
                                        item.isFolder &&
                                            "rct-tree-item-title-container-isFolder",
                                        context.isSelected &&
                                            "rct-tree-item-title-container-selected",
                                        context.isExpanded &&
                                            "rct-tree-item-title-container-expanded",
                                        context.isFocused &&
                                            "rct-tree-item-title-container-focused",
                                        context.isDraggingOver &&
                                            "rct-tree-item-title-container-dragging-over",
                                        context.isSearchMatching &&
                                            "rct-tree-item-title-container-search-match"
                                    )}
                                >
                                    {arrow}
                                    <InteractiveComponent
                                        type={type}
                                        {...(context.interactiveElementProps as any)}
                                        className={cn(
                                            "rct-tree-item-button",
                                            item.isFolder &&
                                                "rct-tree-item-button-isFolder",
                                            context.isSelected &&
                                                "rct-tree-item-button-selected",
                                            context.isExpanded &&
                                                "rct-tree-item-button-expanded",
                                            context.isFocused &&
                                                "rct-tree-item-button-focused",
                                            context.isDraggingOver &&
                                                "rct-tree-item-button-dragging-over",
                                            context.isSearchMatching &&
                                                "rct-tree-item-button-search-match"
                                        )}
                                    >
                                        <span className="w-full">{title}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(item);
                                            }}
                                        >
                                            <X />
                                        </Button>
                                    </InteractiveComponent>
                                </div>
                                {children}
                            </li>
                        );
                    }}
                />
            </UncontrolledTreeEnvironment>
        </div>
    );
};

export default WikiUpdateSidebarForm;
