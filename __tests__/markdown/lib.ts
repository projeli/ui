import { rehypeSanitizeSchema } from "@/lib/markdown/rehype/rehype-sanitize-config";
import rehypeSanitizeCss from "@/lib/markdown/rehype/rehype-sanitize-css";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const ignoreCodeWithMeta = () => (tree: any) => {
  visit(tree, 'element', (node) => {
    if (node.tagName === 'code' && node.data?.meta) {
      node.type = 'ignore';
    }
  });
};

const unignore = () => (tree: any) => {
  visit(tree, 'ignore', (node) => {
    node.type = 'element';
  });
};

const processPreCode = () => (tree: any) => {
  visit(tree, 'element', (node) => {
    if (node.tagName === 'pre') {
      const [codeEl] = node.children;
      if (codeEl?.tagName !== 'code') return;

      if (codeEl.data?.meta) {
        const regex = /event="([^"]*)"/;
        const match = codeEl.data.meta.match(regex);
        if (match) {
          node.__event__ = match[1];
          codeEl.data.meta = codeEl.data.meta.replace(regex, '');
        }
      }

      node.__rawString__ = codeEl.children?.[0]?.value;
      node.__src__ = node.properties?.__src__;
      node.__style__ = node.properties?.__style__;
    }
  });
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(ignoreCodeWithMeta)
  .use(rehypeRaw, { passThrough: ['ignore'] })
  .use(unignore)
  .use(rehypeSanitize, rehypeSanitizeSchema)
  .use(rehypeSanitizeCss)
  .use(processPreCode)
  .use(rehypePrettyCode, { theme: 'one-dark-pro', keepBackground: false })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
  .use(rehypeStringify);

export const processForTree = async (content: string) => {
    const tree = processor.parse(content);
    const transformedTree = await processor.run(tree);
    return transformedTree;
};

export const processToHtml = async (content: string): Promise<string> => {
    const file = await processor.process(content);
    return file.value.toString();
};