import PageContainer from "@/components/layout/page-container";
import Anchor from "@/components/navigation/anchor";
import { Input } from "@/components/ui/input";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
    const { userId } = await auth();

    return (
        <PageContainer className="flex flex-col gap-32">
            <PageContainer className="mt-32 flex justify-between">
                <div className="grid w-full max-w-md grid-rows-[max-content,max-content] gap-4">
                    <h1 className="text-4xl font-bold">
                        Discover, grow, and connect with your community.
                    </h1>
                    <p>
                        Projeli.com is the ultimate hub for all creators. Track
                        your analytics, build your brand, and connect with a
                        passionate community and fellow creators.
                    </p>
                    <div className="mt-4 flex gap-2">
                        {userId ? (
                            <Anchor href="/dashboard">Open Dashboard</Anchor>
                        ) : (
                            <Anchor href="/signin">Join The Community</Anchor>
                        )}
                        <Anchor variant="ghost" href="#features">
                            Learn More
                        </Anchor>
                    </div>
                </div>
                <div className="w-full max-w-lg hidden md:block">
                    <div className="h-64 w-full rounded-xl bg-green-300" />
                </div>
            </PageContainer>
            <div id="search">
                <div className="mx-auto w-full max-w-6xl items-center justify-center gap-4">
                    <hr className="border-muted" />
                </div>
                <div className="mt-8 grid md:grid-cols-[2fr,3fr] gap-8">
                    <div>
                        <div className="h-64 w-full rounded-xl bg-purple-300" />
                    </div>
                    <div className="mx-auto flex w-full max-w-lg flex-col gap-1">
                        <h2 className="text-2xl font-semibold">
                            Search
                            <span className="font-normal">
                                {" "}
                                for projects
                            </span>
                        </h2>
                        <p>
                            Find the perfect project for your needs or interest.
                            Use our powerful search functionality to explore
                            projects across various categories and tags.
                        </p>
                        <div className="mt-2">
                            <Input />
                        </div>
                    </div>
                </div>
            </div>
            <div id="features">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-[10%,max-content,1fr] items-center justify-center gap-4">
                    <hr className="border-muted" />
                    <h2 className="text-2xl font-semibold">Features</h2>
                    <hr className="border-muted" />
                </div>
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="grid grid-rows-[12rem,1fr] gap-4">
                        <div className="h-48 w-full rounded-xl bg-blue-300" />
                        <div className="grid grid-rows-[max-content,max-content] gap-1">
                            <h3 className="text-xl font-semibold">
                                Detailed Analytics
                            </h3>
                            <p>
                                Track your project&apos;s performance with
                                comprehensive analytics. See user engagement,
                                and more to optimize your creations.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-rows-[12rem,1fr] gap-4">
                        <div className="h-48 w-full rounded-xl bg-red-300" />
                        <div className="grid grid-rows-[max-content,max-content] gap-1">
                            <h3 className="text-xl font-semibold">
                                Community Building
                            </h3>
                            <p>
                                Build a dedicated community around your projects.
                                Host discussions, share updates, and engage
                                directly with your audience.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-rows-[12rem,1fr] gap-4">
                        <div className="h-48 w-full rounded-xl bg-green-300" />
                        <div className="grid grid-rows-[max-content,max-content] gap-1">
                            <h3 className="text-xl font-semibold">
                                Project Showcase
                            </h3>
                            <p>
                                Showcase your projects with dedicated pages,
                                detailed descriptions, and beautiful visuals.
                                Attract new users and build your brand.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
