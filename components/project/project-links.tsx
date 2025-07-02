import { ProjectLink } from "@/lib/types/project-types";
import Anchor from "../navigation/anchor";
import { Card } from "../ui/card";
import ProjectLinkIcon from "./project-link-icon";

const ProjectLinks = ({ links }: { links: ProjectLink[] }) => {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold pb-2 border-b border-border">
                Links
            </h2>
            <div className="grid mt-4">
                {links.map((link) => (
                    <Anchor
                        key={link.id}
                        href={link.url}
                        variant="ghost"
                        target="_blank"
                        className="flex gap-2 justify-start"
                    >
                        <ProjectLinkIcon type={link.type} />
                        <p className="text-base font-semibold">{link.name}</p>
                    </Anchor>
                ))}
            </div>
        </Card>
    );
};

export default ProjectLinks;
