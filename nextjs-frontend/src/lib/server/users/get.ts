import { UserType } from '@/lib/types';
import { prisma } from "@/prisma-client";
import { z } from 'zod';

const GetUserParamsSchema = z.object({ userId: z.string() })

type GetUserParams = z.infer<typeof GetUserParamsSchema>;

const getUser = async ({ userId }: GetUserParams): Promise<UserType | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    return user;

}
const GetUsersParamsSchema = z.object({ userIds: z.array(z.string()) })

type GetUsersParams = z.infer<typeof GetUsersParamsSchema>;


const getUsers = async ({ userIds }: GetUsersParams): Promise<Array<UserType>> => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: userIds,
            },
        },
    });
    return users;
}






export { GetUserParamsSchema, GetUsersParamsSchema, getUser, getUsers };
export type { GetUserParams, GetUsersParams };

