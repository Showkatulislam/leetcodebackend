import { Prisma, User } from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository{
    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where:{
                email:email
            }
        })
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return prisma.user.findUnique({
            where:{
                username
            }
        })
    }
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({data})
    }
}

export const authRepository = new AuthRepository()