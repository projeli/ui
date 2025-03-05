import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import ProjectCreateForm from "./project-create-form";

const ProjectCreateDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Project</DialogTitle>
                    <DialogDescription>
                        Create a new project by filling out the form below.
                    </DialogDescription>
                    <div>
                        <ProjectCreateForm />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectCreateDialog;
