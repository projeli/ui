import { rehypeSanitizeSchema } from "@/lib/markdown/rehype/rehype-sanitize-config";
import rehypeSanitizeCss from "@/lib/markdown/rehype/rehype-sanitize-css";
import { MarkdownAsync } from "react-markdown";
import rehypeAutolinkHeadings, {
    Options as AutoLinkOptions,
} from "rehype-autolink-headings";
import rehypePrettyCode, {
    Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeRaw, { Options as RawOptions } from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

const Markdown = async ({ content }: { content: string }) => {
    return (
        <div className="markdown-body">
            <MarkdownAsync
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    () => (tree) => {
                        console.log(JSON.stringify(tree, null, 2));
                        return visit(tree, "element", (node) => {
                            if (node.tagName === "code" && node.data?.meta) {
                                node.type = "ignore";
                            }
                        });
                    },
                    [
                        rehypeRaw,
                        {
                            passThrough: ["ignore"],
                        } as RawOptions,
                    ],
                    () => (tree) => {
                        console.log(JSON.stringify(tree, null, 2));
                        return visit(tree, "ignore", (node) => {
                            node.type = "element";
                        });
                    },
                    [rehypeSanitize, rehypeSanitizeSchema],
                    rehypeSanitizeCss,
                    () => (tree) => {
                        visit(tree, (node) => {
                            if (
                                node?.type === "element" &&
                                node?.tagName === "pre"
                            ) {
                                const [codeEl] = node.children;
                                if (codeEl.tagName !== "code") {
                                    return;
                                }

                                if (codeEl.data?.meta) {
                                    // Extract event from meta and pass it down the tree.
                                    const regex = /event="([^"]*)"/;
                                    const match =
                                        codeEl.data?.meta.match(regex);
                                    if (match) {
                                        node.__event__ = match
                                            ? match[1]
                                            : null;
                                        codeEl.data.meta =
                                            codeEl.data.meta.replace(regex, "");
                                    }
                                }

                                node.__rawString__ = codeEl.children?.[0].value;
                                node.__src__ = node.properties?.__src__;
                                node.__style__ = node.properties?.__style__;
                            }
                        });
                    },
                    [
                        rehypePrettyCode,
                        {
                            theme: "one-dark-pro",
                            keepBackground: false,
                        } as PrettyCodeOptions,
                    ],
                    rehypeSlug,
                    [
                        rehypeAutolinkHeadings,
                        {
                            behavior: "wrap",
                        } as AutoLinkOptions,
                    ],
                ]}
            >
                {content}
            </MarkdownAsync>
        </div>
    );
};

export default Markdown;
