"use client";

import {
    Composer,
    ComposerEditorMentionSuggestionsProps,
} from "@liveblocks/react-comments/primitives";
import { Suspense } from "react";
import { User } from "./User";

import { useUser } from "@/liveblocks-configs/text-room.config";


import { ComponentProps } from "react";

interface AvatarProps extends ComponentProps<"img"> {
    userId: string;
}

export function Avatar({ userId, className, ...props }: AvatarProps) {
    const { user } = useUser(userId);

    return <img src={user.picture} alt={user.name} {...props} />;
}



export function MentionSuggestions({
    userIds,
}: ComposerEditorMentionSuggestionsProps) {
    return (
        <Composer.Suggestions className="p-1 bg-white border border-neutral-200 shadow-sm rounded-lg">
            <Composer.SuggestionsList>
                {userIds.map((userId) => (
                    <MentionSuggestion key={userId} userId={userId} />
                ))}
            </Composer.SuggestionsList>
        </Composer.Suggestions>
    );
}

function MentionSuggestion({ userId }: { userId: string }) {
    return (
        <Composer.SuggestionsListItem
            value={userId}
            className="flex items-center gap-2 py-1 px-2 text-sm rounded cursor-pointer min-h-6 min-w-32 [&>img]:rounded-full data-[selected]:bg-neutral-100 font-medium"
        >
            <Suspense>
                <Avatar userId={userId} width={20} height={20} />
                <User userId={userId} />
            </Suspense>
        </Composer.SuggestionsListItem>
    );
}
