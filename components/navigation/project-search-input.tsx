"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ProjectSearchInput = () => {
    const router = useRouter();
    const [projectQuery, setProjectQuery] = useState("");
    const handleProjectSearch = () => {
        router.push(`/projects?query=${projectQuery}`);
    };
    return (
        <div className="flex gap-2">
            <Input
                value={projectQuery}
                onChange={(e) => setProjectQuery(e.target.value)}
                placeholder="Search for projects..."
            />
            <Button onClick={handleProjectSearch} className="ml-2">
                Search
            </Button>
        </div>
    );
};

export default ProjectSearchInput;
