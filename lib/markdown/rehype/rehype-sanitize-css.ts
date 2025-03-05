import type { Element as HastElement, Root } from "hast";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";

// Define the plugin as a Transformer for rehype (working with hast trees)
export default function rehypeSanitizeCSS(): Transformer<Root, Root> {
    return (tree: Root): Root => {
        visit(tree, "element", (node: HastElement) => {
            if (node.tagName && node.properties && node.properties.style) {
                // Define allowed style properties with validation regex
                const allowedStyles: Record<string, RegExp> = {
                    color: /^#[0-9A-Fa-f]{3,6}$|^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$|^rgba\(\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*[0-1]?\.?\d*\)$|^[a-z]+$/i,
                    "background-color":
                        /^#[0-9A-Fa-f]{3,6}$|^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$|^rgba\(\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*[0-1]?\.?\d*\)$|^[a-z]+$/i,
                    "font-size": /^\d+(px|em|rem|%)$/,
                    "font-weight": /^(normal|bold|bolder|lighter|\d{100,900})$/,
                    "text-align": /^(left|right|center|justify)$/,
                    margin: /^\d+(px|em|rem|%)(\s+\d+(px|em|rem|%)){0,3}$/,
                    "margin-top": /^-?\d+(px|em|rem|%)$/,
                    "margin-right": /^-?\d+(px|em|rem|%)$/,
                    "margin-bottom": /^-?\d+(px|em|rem|%)$/,
                    "margin-left": /^-?\d+(px|em|rem|%)$/,
                    padding: /^\d+(px|em|rem|%)(\s+\d+(px|em|rem|%)){0,3}$/,
                    "padding-top": /^\d+(px|em|rem|%)$/,
                    "padding-right": /^\d+(px|em|rem|%)$/,
                    "padding-bottom": /^\d+(px|em|rem|%)$/,
                    "padding-left": /^\d+(px|em|rem|%)$/,
                    width: /^\d+(px|em|rem|%)$/,
                    height: /^\d+(px|em|rem|%)$/,
                    display: /^(block|inline|inline-block|flex|grid|none)$/,
                    position: /^(static|relative)$/,
                    float: /^(left|right|none)$/,
                    // Flexbox properties
                    flex: /^(\d*\.?\d+|\d+\/\d+|auto|\d+(px|em|rem|%))\s*(\d*\.?\d+|\d+\/\d+|auto|\d+(px|em|rem|%))?\s*(flex-start|flex-end|center|stretch|space-between|space-around|space-evenly)?$/,
                    "flex-direction":
                        /^(row|row-reverse|column|column-reverse)$/,
                    "flex-wrap": /^(nowrap|wrap|wrap-reverse)$/,
                    "justify-content":
                        /^(flex-start|flex-end|center|space-between|space-around|space-evenly)$/,
                    "align-items":
                        /^(flex-start|flex-end|center|baseline|stretch)$/,
                    "align-self":
                        /^(auto|flex-start|flex-end|center|baseline|stretch)$/,
                    "flex-grow": /^\d*\.?\d+$/,
                    "flex-shrink": /^\d*\.?\d+$/,
                    "flex-basis": /^auto|\d+(px|em|rem|%)$/,
                    // Grid properties
                    grid: /^(\d+(px|em|rem|%|fr)|auto|minmax\(\d+(px|em|rem|%),\s*(max-content|min-content|\d+(px|em|rem|%))\))\s*(\d+(px|em|rem|%|fr)|auto|minmax\(\d+(px|em|rem|%),\s*(max-content|min-content|\d+(px|em|rem|%))\))*$/,
                    "grid-template-columns":
                        /^(\d+(px|em|rem|%|fr)|auto|minmax\(\d+(px|em|rem|%),\s*(max-content|min-content|\d+(px|em|rem|%))\))\s*(\d+(px|em|rem|%|fr)|auto|minmax\(\d+(px|em|rem|%),\s*(max-content|min-content|\d+(px|em|rem|%))\))*$/,
                    "grid-template-rows":
                        /^(\d+(px|em|rem|%|fr)|auto|minmax\(\d+(px|em|rem|%),\s*(max-content|min-content|\d+(px|em|rem|%))\))\s*(\d+(px|em|rem|%|fr)|auto|minmax\(\d+(px|em|rem|%),\s*(max-content|min-content|\d+(px|em|rem|%))\))*$/,
                    "grid-gap": /^\d+(px|em|rem|%)(\s+\d+(px|em|rem|%))?$/,
                    gap: /^\d+(px|em|rem|%)(\s+\d+(px|em|rem|%))?$/,
                    "grid-column": /^\d+\/\s*-?\d+$|^\d+$|^span\s+\d+$/,
                    "grid-row": /^\d+\/\s*-?\d+$|^\d+$|^span\s+\d+$/,
                    "justify-items": /^(start|end|center|stretch)$/,
                    "align-content":
                        /^(flex-start|flex-end|center|space-between|space-around|space-evenly|stretch)$/,
                    overflow: /^(visible|hidden|scroll|auto)$/,
                    "overflow-x": /^(visible|hidden|scroll|auto)$/,
                    "overflow-y": /^(visible|hidden|scroll|auto)$/,
                };

                // Parse the style string into an object
                const styles = (node.properties.style as string)
                    .split(";")
                    .reduce((acc, style) => {
                        const [property, value] = style
                            .split(":")
                            .map((str) => str.trim());
                        if (property && value) {
                            acc[property.toLowerCase()] = value;
                        }
                        return acc;
                    }, {} as Record<string, string>);

                // Filter and validate styles
                const filteredStyles = Object.entries(styles)
                    .filter(([property]) => allowedStyles[property])
                    .map(([property, value]) => {
                        const regex = allowedStyles[property];
                        const cleanValue = value.replace(/[<>&"';]/g, "");
                        return regex.test(cleanValue)
                            ? `${property}: ${cleanValue}`
                            : null;
                    })
                    .filter(Boolean)
                    .join("; ");

                // Update the node's style property
                if (filteredStyles) {
                    node.properties.style = filteredStyles;
                } else {
                    delete node.properties.style;
                }
            }
        });
        return tree;
    };
}
