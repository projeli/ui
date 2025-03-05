"use client";

import "@/app/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type MarkdownEditorProps = {
    content: string;
};

const MarkdownEditor = ({ content }: MarkdownEditorProps) => {
    const [value, setValue] = useState<string | undefined>(content);
    const theme = useTheme();

    return (
        <MDEditor
            value={value || ""}
            onChange={setValue}
            height="100%"
            textareaProps={{
                name: "content",
                placeholder: "Write something...",
            }}
            data-color-mode={theme.resolvedTheme === "dark" ? "dark" : "light"}
        />
    );
};

export default MarkdownEditor;
