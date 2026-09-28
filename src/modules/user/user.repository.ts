import prisma from "../../lib/prisma.js";
import { IUserRepository } from "./user.interface.js";
import { PublicUserProfile } from "./user.types.js";

export class UserRepository implements IUserRepository{
    async findPublicProfileByUsername(username: string): Promise<PublicUserProfile | null> {
        const user = await prisma.user.findUnique({
            where:{
                username
            },
            select:{
                id: true,
                username: true,
                role: true,
                createdAt: true
            }
        })
        return user;
    }
}

export const userRepository = new UserRepository()