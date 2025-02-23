import { ProjectCategory as ProjectCategoryType } from "@/lib/types/project-types";
import { cn } from "@/lib/utils";
import _ from "lodash";
import {
    Amphora,
    BookHeart,
    BookType,
    Bot,
    Brain,
    BriefcaseBusiness,
    Cable,
    Camera,
    ChefHat,
    CircleEllipsis,
    CodeXml,
    Cpu,
    Film,
    Gamepad2,
    Globe,
    Hammer,
    HandHeart,
    HeartPulse,
    Landmark,
    Languages,
    Library,
    Microscope,
    MonitorPlay,
    Mountain,
    Music,
    NotebookPen,
    Paintbrush,
    PencilRuler,
    Plane,
    Rocket,
    School,
    Scissors,
    Shirt,
    Signature,
    Sprout,
    Trees,
    Trophy,
} from "lucide-react";

type ProjectCategoryProps = React.ComponentProps<"div"> & {
    category: ProjectCategoryType;
};

const ProjectCategory = ({
    category,
    className,
    ...props
}: ProjectCategoryProps) => {
    return (
        <div className={cn("flex items-center gap-2", className)} {...props}>
            <Icon category={category} />
            <span>{_.startCase(category)}</span>
        </div>
    );
};

const Icon = ({ category }: { category: ProjectCategoryType }) => {
    switch (category) {
        case "Adventure":
            return <Mountain className="size-4" />;
        case "Animation":
            return <MonitorPlay className="size-4" />;
        case "Art":
            return <Paintbrush className="size-4" />;
        case "Business":
            return <BriefcaseBusiness className="size-4" />;
        case "Cooking":
            return <ChefHat className="size-4" />;
        case "Crafts":
            return <Scissors className="size-4" />;
        case "Design":
            return <PencilRuler className="size-4" />;
        case "DIY":
            return <Hammer className="size-4" />;
        case "Education":
            return <School className="size-4" />;
        case "Electronics":
            return <Cable className="size-4" />;
        case "Environment":
            return <Trees className="size-4" />;
        case "Fashion":
            return <Shirt className="size-4" />;
        case "Film":
            return <Film className="size-4" />;
        case "Finance":
            return <Landmark className="size-4" />;
        case "Gaming":
            return <Gamepad2 className="size-4" />;
        case "Health":
            return <HeartPulse className="size-4" />;
        case "History":
            return <Amphora className="size-4" />;
        case "Hobbies":
            return <BookHeart className="size-4" />;
        case "Journalism":
            return <NotebookPen className="size-4" />;
        case "Languages":
            return <Languages className="size-4" />;
        case "Literature":
            return <Library className="size-4" />;
        case "Music":
            return <Music className="size-4" />;
        case "Nature":
            return <Sprout className="size-4" />;
        case "Photography":
            return <Camera className="size-4" />;
        case "Programming":
            return <CodeXml className="size-4" />;
        case "Psychology":
            return <Brain className="size-4" />;
        case "Robotics":
            return <Bot className="size-4" />;
        case "Science":
            return <Microscope className="size-4" />;
        case "Space":
            return <Rocket className="size-4" />;
        case "Sports":
            return <Trophy className="size-4" />;
        case "Technology":
            return <Cpu className="size-4" />;
        case "Travel":
            return <Plane className="size-4" />;
        case "Tutorials":
            return <BookType className="size-4" />;
        case "WebDevelopment":
            return <Globe className="size-4" />;
        case "Wellness":
            return <HandHeart className="size-4" />;
        case "Writing":
            return <Signature className="size-4" />;
        case "Other":
            return <CircleEllipsis className="size-4" />;
        default:
            return null;
    }
};

export default ProjectCategory;
