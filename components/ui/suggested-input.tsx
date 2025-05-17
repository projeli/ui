"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Card } from "./card";

export type Suggestion = {
    id: string;
    name: string;
    image?: string;
};

type SuggestedInputProps = {
    maxSuggestions?: number;
    minLength?: number;
    onChange: (value: string) => void;
    onSelect?: (suggestion: Suggestion) => void;
    onDeselect?: () => void;
    suggestions?: Suggestion[];
    loading?: boolean;
};

const SuggestedInput = ({
    maxSuggestions = 5,
    minLength = 3,
    onChange,
    onSelect,
    onDeselect,
    suggestions: suggestionsProp = [],
    loading = false,
}: SuggestedInputProps) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>(
        suggestionsProp || []
    );
    const [selected, setSelected] = useState<Suggestion | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (suggestionsProp.length > 0) {
            setSuggestions(suggestionsProp);
        }
    }, [suggestionsProp]);

    if (selected) {
        return (
            <Card className="h-[42px] px-4 flex justify-between items-center gap-2 shadow-none">
                <div className="flex gap-2">
                    {selected.image && (
                        <img
                            src={selected.image}
                            alt={selected.name}
                            className="size-6 rounded-full"
                        />
                    )}
                    <span>{selected.name}</span>
                </div>
                <Button
                    variant="destructive"
                    className="size-8 rounded-sm"
                    onClick={() => {
                        setSelected(null);
                        setSuggestions([]);
                        if (onDeselect) {
                            onDeselect();
                        }
                        onChange("");
                        setQuery("");
                    }}
                >
                    <X />
                </Button>
            </Card>
        );
    }

    return (
        <div className="relative">
            <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full peer"
                onChange={(e) => {
                    const value = e.target.value;
                    if (value.length >= minLength) {
                        onChange(value);
                    } else if (value.length < minLength) {
                        setSuggestions([]);
                    }
                    setQuery(value);
                }}
            />
            {(loading || query.length >= minLength) && (
                <Card className="absolute left-0 right-0 rounded-lg mt-1 peer-focus:block hover:block hidden overflow-hidden z-20">
                    {loading ? (
                        <div className="flex items-center justify-center p-2">
                            <span>Loading...</span>
                        </div>
                    ) : suggestions.length > 0 ? (
                        suggestions
                            .slice(0, maxSuggestions)
                            .map((suggestion, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => {
                                        setSelected(suggestion);
                                        setSuggestions([]);
                                        if (onSelect) {
                                            onSelect(suggestion);
                                        }
                                    }}
                                >
                                    {suggestion.image && (
                                        <img
                                            src={suggestion.image}
                                            alt={suggestion.name}
                                            className="size-6 rounded-full"
                                        />
                                    )}
                                    <span>{suggestion.name}</span>
                                </Button>
                            ))
                    ) : (
                        <div className="flex items-center justify-center p-2">
                            <span>No suggestions found</span>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};

export default SuggestedInput;
