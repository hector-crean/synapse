import { LIVEBLOCKS_SECRET_KEY } from "@/app/api/liveblocks";
import { RoomInfoType } from "@/lib/types";
import axios from 'axios';


async function getRooms(): Promise<RoomInfoType> {

    return axios
        .get(`https://api.liveblocks.io/v2/rooms`, {
            headers: {
                Authorization: `Bearer ${LIVEBLOCKS_SECRET_KEY}`,
            },
        })
        .then((res) => res.data)
}

export { getRooms };

