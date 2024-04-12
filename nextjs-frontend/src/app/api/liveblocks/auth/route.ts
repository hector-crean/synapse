

import { liveblocks } from "@/app/api/liveblocks";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { UserSchema } from "../../../../../prisma/generated/zod";




export async function POST(req: NextApiRequest, res: NextApiResponse) {


  // Anonymous user info
  let user: User = {
    id: "anonymous",
    name: "Anonymous",
    email: 'anon@ymous.com',
    emailVerified: null,
    image: null
  };


  const nextSession = await auth()
  const result = UserSchema.safeParse(nextSession?.user)

  if (result.success) {
    user = result.data;
  } else {
    console.log(result.error)
  }




  // Get the current user from your database
  // const user = __getUserFromDB__(req);


  // const identify = await liveblocks.identifyUser(user.email);


  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.email,
    {
      userInfo: {
        name: user.name ?? 'unknown',
        avatar: user.image ?? ''
        
      }
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
