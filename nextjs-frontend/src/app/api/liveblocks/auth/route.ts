

import { liveblocks } from "@/app/api/liveblocks";
import { auth } from "@/auth";
import { IUserInfo } from "@liveblocks/node";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { UserSchema } from "../../../../../prisma/generated/zod";


export type UserInfo = IUserInfo & {
  email: string;
}


export async function POST(req: NextApiRequest, res: NextApiResponse) {




  const nextSession = await auth()
  const result = UserSchema.safeParse(nextSession?.user)

  const user: User = result.success ? result.data : {
    id: "anonymous",
    name: "Anonymous",
    email: 'anon@ymous.com',
    emailVerified: null,
    image: null
  };






  // Get the current user from your database
  // const user = __getUserFromDB__(req);


  // const identify = await liveblocks.identifyUser(user.email);

  
  const userInfo: UserInfo = {
    name: user.name ?? 'Unknown',
    avatar: user.image ?? '',
    id: user.id,
    email: user.email,
  }

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.email,
    {
      userInfo: userInfo
    }
  );



  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group

  //<organization_id>:<group_id>:<document_id>
  // session.allow(`liveblocks:examples:*`, session.FULL_ACCESS);
  session.allow('*', session.FULL_ACCESS)
  // session.allow(`synapse:${user.group}:*`, session.FULL_ACCESS)
  // session.allow(`${user.organization}:*`, session.READ_ACCESS);
  // session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS);



  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
