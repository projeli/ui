export default async function Page({
    params,
}: {
    params: Promise<{ slug: string; wikiSlug: string }>;
}) {
    const { slug, wikiSlug } = await params;

    return (
        <div>
            Wiki Page
            {slug}
            {wikiSlug}
        </div>
    );
}
