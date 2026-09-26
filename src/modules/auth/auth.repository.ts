import { Prisma, RefreshToken, User } from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository {
    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                username,
            },
        });
    }
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({ data });
    }

    async createRefreshToken(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken> {
        return prisma.refreshToken.create({
            data
        })
    }

    async findRefreshTokenByHash(tokenHash: string): Promise<RefreshToken | null> {
        return prisma.refreshToken.findUnique(
            {
                where:{
                    tokenHash
                }
            }
        )
    }


    async revokeRefreshToken(id: string): Promise<RefreshToken> {
        return prisma.refreshToken.update({
            where:{
                id,
            },
            data:{
                revokedAt:new Date()
            }
        })
    }

}

export const authRepository = new AuthRepository();
