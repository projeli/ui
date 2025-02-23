import { ProjectLink } from "@/lib/types/project-types";
import Anchor from "../navigation/anchor";
import { SquareArrowOutUpRight } from "lucide-react";
import { Card } from "../ui/card";

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
                        className="flex gap-2 justify-start"
                    >
                        <SquareArrowOutUpRight />
                        <p className="text-base font-semibold">{link.name}</p>
                    </Anchor>
                ))}
            </div>
        </Card>
    );
};

export default ProjectLinks;
