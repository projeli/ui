import deepmerge from "deepmerge";
import { defaultSchema, Schema } from "hast-util-sanitize";

const customSchema: Schema = {
    tagNames: ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6", "p", "strong", "em", "a", "ul", "ol", "li", "blockquote", "code", "pre"],
    attributes: {
        div: ["style", "className"],
        span: ["style", "className"],
        h1: ["style", "className"],
        h2: ["style", "className"],
        h3: ["style", "className"],
        h4: ["style", "className"],
        h5: ["style", "className"],
        h6: ["style", "className"],
        p: ["style", "className"],
        strong: ["style", "className"],
        em: ["style", "className"],
        a: ["style", "className", "href", "title", "target", "rel"],
        ul: ["style", "className"],
        ol: ["style", "className"],
        li: ["style", "className"],
        blockquote: ["style", "className"],
        code: ["style", "className"],
        pre: ["style", "className"],
    }, // Allowed attributes for each tag
    strip: [], // Tags to strip from the output
};

export const rehypeSanitizeSchema = deepmerge(
    defaultSchema,
    customSchema
) as Schema;
