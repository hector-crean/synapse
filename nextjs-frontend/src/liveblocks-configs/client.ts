import { createClient } from "@liveblocks/client";



export const ENDPOINT_BASE_URL = "/api/liveblocks" as const;



const client = createClient({
    authEndpoint: "/api/liveblocks/auth",
    async resolveUsers({ userIds }) {
        const searchParams = new URLSearchParams(
            userIds.map((userId) => ["userIds", userId])
        );
        const response = await fetch(`/api/users?${searchParams}`);

        if (!response.ok) {
            throw new Error("Problem resolving user");
        }

        const users = await response.json();
        return users;
    },
    async resolveMentionSuggestions({ text }) {
        const response = await fetch(
            `/api/users/search?text=${encodeURIComponent(text)}`
        );

        if (!response.ok) {
            throw new Error("Problem resolving user");
        }

        const userIds = await response.json();
        return userIds;
    },
});



export { client };

