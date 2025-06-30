import CustomSignInButton from "@/components/clerk/custom-sign-in-button";
import PencilsImage from "@/components/images/pencils";
import PageContainer from "@/components/layout/page-container";
import Anchor from "@/components/navigation/anchor";
import ProjectSearchInput from "@/components/navigation/project-search-input";
import ProjectCard from "@/components/project/project-card";
import { Card } from "@/components/ui/card";
import { projectApi } from "@/lib/api/project/project-api";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import {
    BookOpen,
    Compass,
    GitMerge,
    Image,
    MonitorSmartphone,
    Rocket,
    Search,
    Users,
} from "lucide-react";

export default async function Home() {
    const { userId } = await auth();
    const projects = await projectApi
        .get({
            page: "1",
            pageSize: "8",
            order: "Relevance",
        })
        .then((res) => res.data);

    return (
        <PageContainer size="full" className="p-0">
            <PageContainer size="large" className="mt-12">
                <ProjectSearchInput />
            </PageContainer>
            <PageContainer size="large" className="py-12">
                <div className="flex justify-between gap-8">
                    <div className="grid h-max my-12">
                        <div className="max-w-lg mb-8">
                            <h1 className="text-2xl lg:text-4xl font-bold mb-8">
                                Explore and Create{" "}
                                <span className="text-3xl lg:text-5xl font-black text-primary">
                                    Beautiful Projects.
                                </span>
                            </h1>
                            <p>
                                Projeli helps creators show off their work and
                                share their story with simple, beautiful wikis.
                                Perfect for artists, gamers, and developers.
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-4">
                            <Anchor href="/projects">Explore Projects</Anchor>
                            {userId ? (
                                <Anchor
                                    href="/dashboard/projects"
                                    variant="outline"
                                >
                                    Start Creating
                                </Anchor>
                            ) : (
                                <CustomSignInButton
                                    label="Start Creating"
                                    icon={<></>}
                                    variant="outline"
                                />
                            )}
                        </div>
                    </div>
                    <div className="size-96 hidden lg:block">
                        <PencilsImage />
                    </div>
                </div>
            </PageContainer>
            <div className="bg-secondary/75 text-secondary-foreground my-12 py-24">
                <PageContainer size="default">
                    <h2 className="text-2xl lg:text-3xl font-bold">
                        Featured Projects
                    </h2>
                    <p className="mb-8">
                        Discover some of the best projects created by our
                        community.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {projects.map((project, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-full hidden",
                                    i < 4 && "block",
                                    i < 6 && "md:block",
                                    i < 8 && "xl:block"
                                )}
                            >
                                <ProjectCard
                                    project={project}
                                    layout={"mini"}
                                    href={"projects"}
                                />
                            </div>
                        ))}
                    </div>
                </PageContainer>
            </div>
            <PageContainer size="large" className="py-12">
                <div className="flex flex-col items-center mb-16 w-full">
                    <div className="border-2 border-secondary rounded-lg bg-secondary/25 text-secondary py-2 px-4 mb-8">
                        <h2 className="text-base font-semibold w-max">
                            For Explorers
                        </h2>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">
                        Discover Inspiring Projects
                    </h3>
                    <p className="text-lg text-muted-foreground text-center max-w-xl">
                        Browse a diverse collection of wikis showcasing
                        innovative projects from creators worldwide.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-y-12">
                    <Card className="p-6 pt-8 relative">
                        <div className="absolute flex justify-center items-center -top-6 left-6 w-12 h-12 bg-secondary rounded-lg">
                            <Search className="text-secondary-foreground" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">
                            Powerful Search
                        </h4>
                        <p>
                            Quickly find specific topics or projects using our
                            search functionality, with results across all
                            accessible wikis.
                        </p>
                    </Card>
                    <Card className="p-6 pt-8 relative">
                        <div className="absolute flex justify-center items-center -top-6 left-6 w-12 h-12 bg-secondary rounded-lg">
                            <Image className="text-secondary-foreground" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">
                            Rich Content Experience
                        </h4>
                        <p>
                            Dive into detailed wiki pages packed with multimedia
                            like images and videos for deeper insights.
                        </p>
                    </Card>
                    <Card className="p-6 pt-8 relative">
                        <div className="absolute flex justify-center items-center -top-6 left-6 w-12 h-12 bg-secondary rounded-lg">
                            <Compass className="text-secondary-foreground" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">
                            Effortless Navigation
                        </h4>
                        <p>
                            Use tables of contents and categories to explore
                            wikis seamlessly, finding exactly what you need.
                        </p>
                    </Card>
                    <Card className="p-6 pt-8 relative">
                        <div className="absolute flex justify-center items-center -top-6 left-6 w-12 h-12 bg-secondary rounded-lg">
                            <MonitorSmartphone className="text-secondary-foreground" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">
                            Responsive Design
                        </h4>
                        <p>
                            Access wikis on any device, desktop or mobile, with
                            a fast, user-friendly interface.
                        </p>
                    </Card>
                </div>
            </PageContainer>
            <PageContainer size="large" className="py-24">
                <div className="flex flex-col items-center mb-16 w-full">
                    <div className="border-2 border-primary rounded-lg bg-primary/25 text-primary py-2 px-4 mb-8">
                        <h2 className="text-base font-semibold w-max">
                            For Creators
                        </h2>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">
                        Build and Share Your Project Wiki
                    </h3>
                    <p className="text-lg text-muted-foreground text-center max-w-xl">
                        Create a stunning wiki for your project in minutes,
                        with powerful features to showcase your work and
                        collaborate with others.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-y-12">
                    <Card className="p-6 pt-8 relative">
                        <div className="absolute flex justify-center items-center -top-6 left-6 w-12 h-12 bg-primary rounded-lg">
                            <BookOpen className="text-primary-foreground" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">
                            Easy Wiki Creation
                        </h4>
                        <p>
                            Set up a project wiki in minutes using a rich text
                            editor or markdown, no technical skills needed.
                        </p>
                    </Card>
                    <Card className="p-6 pt-8 relative">
                        <div className="absolute flex justify-center items-center -top-6 left-6 w-12 h-12 bg-primary rounded-lg">
                            <Users className="text-primary-foreground" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">
                            Collaborate Seamlessly
                        </h4>
                        <p>
                            Invite team members to edit or view unpublished
                            wikis, with permission-based access, you control who
                            can do what.
                        </p>
                    </Card>
                    <Card className="p-6 pt-8 relative">
                        <div className="absolute flex justify-center items-center -top-6 left-6 w-12 h-12 bg-primary rounded-lg">
                            <GitMerge className="text-primary-foreground" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">
                            Version Control
                        </h4>
                        <p>
                            Track all changes and revert to previous versions to
                            ensure your wiki stays accurate and up-to-date.
                        </p>
                    </Card>
                    <Card className="p-6 pt-8 relative">
                        <div className="absolute flex justify-center items-center -top-6 left-6 w-12 h-12 bg-primary rounded-lg">
                            <Rocket className="text-primary-foreground" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">
                            Fast Performance
                        </h4>
                        <p>
                            Enjoy page load times under 2 seconds, ensuring a
                            smooth experience even during peak usage.
                        </p>
                    </Card>
                </div>
            </PageContainer>
        </PageContainer>
    );
}
