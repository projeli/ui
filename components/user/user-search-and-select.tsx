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
                (user: ProjeliUser) => !excludedUsers.includes(user.id)
            );

            const mappedSuggestions = filteredSuggestions
                .map((user: ProjeliUser) => ({
                    id: user.id,
                    name: user.userName,
                    image: user.imageUrl,
                }))
                .filter((suggestion) => !excludedUsers.includes(suggestion.id));
            setSuggestions(mappedSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [formState]);

    return (
        <SuggestedInput
            onChange={handleInputChange}
            onSelect={(suggestion) => {
                onUserSelect({ id: suggestion.id, userName: suggestion.name });
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
