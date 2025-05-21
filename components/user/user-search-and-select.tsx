"use client";

import { searchUserAction } from "@/actions/user/search-user";
import { ProjeliUser } from "@/lib/types/user-types";
import { startTransition, useActionState, useEffect, useState } from "react";
import SuggestedInput, { Suggestion } from "../ui/suggested-input";

type UserSearchAndSelectProps = {
    excludedUsers: string[];
    onUserSelect: (user: ProjeliUser) => void;
    onUserDeselect?: () => void;
};

const UserSearchAndSelect = ({
    excludedUsers,
    onUserSelect,
    onUserDeselect = () => {},
}: UserSearchAndSelectProps) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const [formState, formAction, isLoading] = useActionState(
        searchUserAction,
        {
            success: false,
            message: "",
        }
    );

    const handleInputChange = (value: string) => {
        if (value.length >= 3) {
            startTransition(() => {
                const formData = new FormData();
                formData.append("query", value);
                formAction(formData);
            });
        } else {
            setSuggestions([]);
        }
    };

    useEffect(() => {
        if (formState.success && formState.data) {
            const filteredSuggestions = formState.data.filter(
                (user: ProjeliUser) => !excludedUsers.includes(user.userId)
            );

            const mappedSuggestions = filteredSuggestions
                .map((user: ProjeliUser) => ({
                    userId: user.userId,
                    name: user.userName,
                    image: user.imageUrl,
                }))
                .filter((suggestion) => !excludedUsers.includes(suggestion.userId));
            setSuggestions(mappedSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [formState]);

    return (
        <SuggestedInput
            onChange={handleInputChange}
            onSelect={(suggestion) => {
                onUserSelect({ userId: suggestion.userId, userName: suggestion.name, imageUrl: "", email: "" });
            }}
            onDeselect={() => {
                onUserDeselect();
            }}
            maxSuggestions={5}
            minLength={3}
            suggestions={suggestions}
            loading={isLoading}
        />
    );
};

export default UserSearchAndSelect;
