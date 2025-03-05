import deepmerge from "deepmerge";
import { defaultSchema, Schema } from "hast-util-sanitize";

const customSchema: Schema = {
    tagNames: ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6", "p"], // Allow <div> tags
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
    },
    strip: [], // Prevent stripping of allowed tags
};

export const rehypeSanitizeSchema = deepmerge(
    defaultSchema,
    customSchema
) as Schema;
