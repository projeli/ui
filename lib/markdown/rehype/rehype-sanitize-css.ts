import type { Element as HastElement, Root } from "hast";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";

// Define the plugin as a Transformer for rehype (working with hast trees)
export default function rehypeSanitizeCSS(): Transformer<Root, Root> {
    return (tree: Root): Root => {
        visit(tree, "element", (node: HastElement) => {
            if (node.tagName && node.properties && node.properties.style) {
                const safeProperties: string[] = [
                    "color", "background-color", "background-repeat", "background-position",
                    "font-family", "font-size", "font-weight", "font-style",
                    "text-align", "text-decoration", "text-transform", "white-space",
                    "letter-spacing", "word-spacing", "line-height",
                    "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
                    "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
                    "width", "height", "min-width", "max-width", "min-height", "max-height",
                    "border", "border-width", "border-style", "border-color",
                    "border-top", "border-right", "border-bottom", "border-left", "border-radius",
                    "display", "float", "clear", "position", "top", "right", "bottom", "left",
                    "z-index", "opacity", "visibility", "overflow", "overflow-x", "overflow-y",
                    "flex", "flex-direction", "flex-wrap", "justify-content", "align-items",
                    "align-self", "grid", "grid-template-columns", "grid-template-rows",
                    "grid-gap", "gap", "grid-column", "grid-row", "justify-items", "align-content",
                    "cursor", "transition", "animation", "transform"
                ];

                const num: string = "(?:\\d+(?:\\.\\d+)?|\\.\\d+)"; // Numeric value (integer or decimal)
                const lengthRegex: RegExp = new RegExp(`^${num}(px|em|rem|%|deg|vw|vh|vmin|vmax)?$|^auto$`);

                const colorPattern: string = "(?:#[0-9A-Fa-f]{3,6}|rgb\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*\\)|rgba\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*[0-1](?:\\.\\d+)?\\s*\\)|hsl\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%\\s*,\\s*\\d{1,3}%\\s*\\)|hsla\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%\\s*,\\s*\\d{1,3}%\\s*,\\s*[0-1](?:\\.\\d+)?\\s*\\)|transparent|currentColor|[a-z]+)";

                const colorRegex: RegExp = new RegExp(`^${colorPattern}$`);

                const widthRegex: string = `(?:${num}(px|em|rem|%)|thin|medium|thick)`;
                const styleRegex: string = `(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)`;

                const borderRegex: RegExp = new RegExp(
                    `^(?:${widthRegex}\\s+${styleRegex}\\s+${colorPattern}|` +
                    `${widthRegex}\\s+${colorPattern}\\s+${styleRegex}|` +
                    `${styleRegex}\\s+${widthRegex}\\s+${colorPattern}|` +
                    `${styleRegex}\\s+${colorPattern}\\s+${widthRegex}|` +
                    `${colorPattern}\\s+${widthRegex}\\s+${styleRegex}|` +
                    `${colorPattern}\\s+${styleRegex}\\s+${widthRegex})$`
                );

                const allowedStyles: Record<string, RegExp> = {
                    "color": colorRegex, // Uses strict, anchored regex
                    "background-color": colorRegex, // Uses strict, anchored regex
                    "background-repeat": /^(repeat|no-repeat|repeat-x|repeat-y)$/,
                    "background-position": /^(left|center|right|top|bottom|\d+(px|em|rem|%)\s+\d+(px|em|rem|%))$/,
                    "font-family": /^[\w\s,-]+$/,
                    "font-size": lengthRegex,
                    "font-weight": /^(normal|bold|bolder|lighter|[1-9]00|1000)$/,
                    "font-style": /^(normal|italic|oblique)$/,
                    "text-align": /^(left|right|center|justify)$/,
                    "text-decoration": /^(none|underline|overline|line-through)$/,
                    "text-transform": /^(none|capitalize|uppercase|lowercase)$/,
                    "white-space": /^(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)$/,
                    "letter-spacing": lengthRegex,
                    "word-spacing": lengthRegex,
                    "line-height": new RegExp(`^(?:${num}|${num}(px|em|rem|%))$|^normal$`),
                    "margin": new RegExp(`^${num}(px|em|rem|%)(\\s+${num}(px|em|rem|%)){0,3}$|^auto$`),
                    "margin-top": lengthRegex,
                    "margin-right": lengthRegex,
                    "margin-bottom": lengthRegex,
                    "margin-left": lengthRegex,
                    "padding": new RegExp(`^${num}(px|em|rem|%)(\\s+${num}(px|em|rem|%)){0,3}$`),
                    "padding-top": lengthRegex,
                    "padding-right": lengthRegex,
                    "padding-bottom": lengthRegex,
                    "padding-left": lengthRegex,
                    "width": lengthRegex,
                    "height": lengthRegex,
                    "min-width": lengthRegex,
                    "max-width": lengthRegex,
                    "min-height": lengthRegex,
                    "max-height": lengthRegex,
                    "border": borderRegex, // Uses the correctly built regex
                    "border-width": lengthRegex,
                    "border-style": /^(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)$/,
                    "border-color": colorRegex, // Uses strict, anchored regex
                    "border-top": borderRegex,
                    "border-right": borderRegex,
                    "border-bottom": borderRegex,
                    "border-left": borderRegex,
                    "border-radius": new RegExp(`^${num}(px|em|rem|%)(\\s+${num}(px|em|rem|%)){0,3}$`),
                    "display": /^(block|inline|inline-block|flex|grid|none)$/,
                    "float": /^(left|right|none)$/,
                    "clear": /^(none|left|right|both)$/,
                    "position": /^(static|relative|absolute|sticky)$/,
                    "top": lengthRegex,
                    "right": lengthRegex,
                    "bottom": lengthRegex,
                    "left": lengthRegex,
                    "z-index": /^-?\d+$/,
                    "opacity": /^0(?:\.\d+)?$|^1(?:\.0+)?$/,
                    "visibility": /^(visible|hidden|collapse)$/,
                    "overflow": /^(visible|hidden|scroll|auto)$/,
                    "overflow-x": /^(visible|hidden|scroll|auto)$/,
                    "overflow-y": /^(visible|hidden|scroll|auto)$/,
                    "flex": new RegExp(`^(${num}|auto)(\\s+(${num}|auto)(\\s+(flex-start|flex-end|center|stretch|space-between|space-around|space-evenly))?)?$`),
                    "flex-direction": /^(row|row-reverse|column|column-reverse)$/,
                    "flex-wrap": /^(nowrap|wrap|wrap-reverse)$/,
                    "justify-content": /^(flex-start|flex-end|center|space-between|space-around|space-evenly)$/,
                    "align-items": /^(flex-start|flex-end|center|baseline|stretch)$/,
                    "align-self": /^(auto|flex-start|flex-end|center|baseline|stretch)$/,
                    "grid": new RegExp(`^(${num}(px|em|rem|%|fr)|auto|minmax\\(${num}(px|em|rem|%),\\s*(max-content|min-content|${num}(px|em|rem|%))\\))(\\s+(${num}(px|em|rem|%|fr)|auto|minmax\\(${num}(px|em|rem|%),\\s*(max-content|min-content|${num}(px|em|rem|%))\\)))*$`),
                    "grid-template-columns": new RegExp(`^(${num}(px|em|rem|%|fr)|auto|minmax\\(${num}(px|em|rem|%),\\s*(max-content|min-content|${num}(px|em|rem|%))\\))(\\s+(${num}(px|em|rem|%|fr)|auto|minmax\\(${num}(px|em|rem|%),\\s*(max-content|min-content|${num}(px|em|rem|%))\\)))*$`),
                    "grid-template-rows": new RegExp(`^(${num}(px|em|rem|%|fr)|auto|minmax\\(${num}(px|em|rem|%),\\s*(max-content|min-content|${num}(px|em|rem|%))\\))(\\s+(${num}(px|em|rem|%|fr)|auto|minmax\\(${num}(px|em|rem|%),\\s*(max-content|min-content|${num}(px|em|rem|%))\\)))*$`),
                    "grid-gap": new RegExp(`^${num}(px|em|rem|%)(\\s+${num}(px|em|rem|%))?$`),
                    "gap": new RegExp(`^${num}(px|em|rem|%)(\\s+${num}(px|em|rem|%))?$`),
                    "grid-column": /^\d+\/\s*-?\d+$|^\d+$|^span\s+\d+$/,
                    "grid-row": /^\d+\/\s*-?\d+$|^\d+$|^span\s+\d+$/,
                    "justify-items": /^(start|end|center|stretch)$/,
                    "align-content": /^(flex-start|flex-end|center|space-between|space-around|space-evenly|stretch)$/,
                    "cursor": /^(auto|default|pointer|crosshair|text|move|not-allowed|grab|grabbing|zoom-in|zoom-out|help|wait|progress)$/,
                    "transition": new RegExp(`^(${safeProperties.join("|")})\\s+${num}(s|ms)(\\s+(ease|linear|ease-in|ease-out|ease-in-out))?(\\s+${num}(s|ms))?(\\s*,\\s*(${safeProperties.join("|")})\\s+${num}(s|ms)(\\s+(ease|linear|ease-in|ease-out|ease-in-out))?)*$`),
                    "animation": new RegExp(`^([a-zA-Z][a-zA-Z0-9_-]*)\\s+${num}(s|ms)(\\s+(ease|linear|ease-in|ease-out|ease-in-out))?(\\s+(infinite|${num}))?(\\s+(normal|reverse|alternate|alternate-reverse))?(\\s+(${num}(px|em|rem|%|deg|vw|vh|vmin|vmax)?))?(\\s+(${num}(px|em|rem|%|deg|vw|vh|vmin|vmax)?))?$`),
                    "transform": new RegExp(`^(translate|scale|rotate|skew|matrix|perspective)(\\(${num}(px|em|rem|%|deg)?(\\s*,\\s*${num}(px|em|rem|%|deg)?)*\\))(\\s+(translate|scale|rotate|skew|matrix|perspective)(\\(${num}(px|em|rem|%|deg)?(\\s*,\\s*${num}(px|em|rem|%|deg)?)*\\)))*$`)
                };

                const styles = (node.properties.style as string)
                    .split(";")
                    .reduce((acc: Record<string, string>, style: string) => {
                        const [property, value] = style.split(":").map((str) => str.trim());
                        if (property && value) {
                            acc[property.toLowerCase()] = value;
                        }
                        return acc;
                    }, {});

                const filteredStyles = Object.entries(styles)
                    .filter(([property]) => safeProperties.includes(property))
                    .map(([property, value]) => {
                        const cleanValue = value.replace(/[<>&"';]|url\(|javascript:/gi, "");
                        const regex = allowedStyles[property];
                        return regex && regex.test(cleanValue) ? `${property}: ${cleanValue}` : null;
                    })
                    .filter(Boolean)
                    .join("; ");

                // Update or remove style property
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