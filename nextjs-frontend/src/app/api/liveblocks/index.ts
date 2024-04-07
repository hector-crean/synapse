import { Liveblocks } from "@liveblocks/node";

const SECRET_KEY = process.env.LIVEBLOCKS_SECRET_KEY as string

const liveblocks = new Liveblocks({
    secret: SECRET_KEY
});

export { liveblocks };

