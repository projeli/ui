import { Card } from "../ui/card";
import SearchparamsInput from "../ui/searchparams-input";
import ProjectCardTypeSwitch from "./project-card-type-switch";
import ProjectCreateDialog from "./project-create-dialog";
import { ProjectOrderSelect } from "./project-order-select";
import { ProjectPageSizeSelect } from "./project-page-size-select";

type ProjectSearchHeaderProps = {
    query: string;
    order: string;
    pageSize: string;
    layout: "grid" | "list";
    options?: ProjectSearchHeaderOptions;
};

type ProjectSearchHeaderOptions = {
    searchBar?: boolean;
    orderSelect?: boolean;
    pageSizeSelect?: boolean;
    layoutSwitch?: boolean;
    newProjectButton?: boolean;
};

const ProjectSearchHeader = ({
    query,
    order,
    pageSize,
    layout,
    options,
}: ProjectSearchHeaderProps) => {
    return (
        <Card className="p-6 flex flex-wrap gap-4">
            {options?.searchBar && (
                <SearchparamsInput
                    name="query"
                    className="flex-1 min-w-48"
                    placeholder="Search projects"
                    defaultValue={query}
                />
            )}
            {options?.orderSelect && (
                <span className="flex items-center whitespace-nowrap text-sm gap-2 grow sm:grow-0">
                    Order by
                    <ProjectOrderSelect order={order} />
                </span>
            )}
            {options?.pageSizeSelect && (
                <span className="flex items-center whitespace-nowrap text-sm gap-2 grow sm:grow-0">
                    Per page
                    <ProjectPageSizeSelect pageSize={pageSize} />
                </span>
            )}
            {options?.layoutSwitch && <ProjectCardTypeSwitch layout={layout} />}
            {options?.newProjectButton && <ProjectCreateDialog />}
        </Card>
    );
};

export default ProjectSearchHeader;
