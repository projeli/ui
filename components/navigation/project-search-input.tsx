"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ProjectSearchInput = () => {
    const router = useRouter();
    const [projectQuery, setProjectQuery] = useState("");

    const handleProjectSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/projects?query=${projectQuery}`);
    };
    return (
        <form onSubmit={handleProjectSearch} className="flex gap-2">
            <Input
                value={projectQuery}
                onChange={(e) => setProjectQuery(e.target.value)}
                placeholder="Search for projects..."
            />
            <Button type="submit" className="ml-2">
                Search
            </Button>
        </form>
    );
};

export default ProjectSearchInput;
