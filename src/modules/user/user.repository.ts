import prisma from "../../lib/prisma.js";
import { IUserRepository } from "./user.interface.js";
import { CurrentUser, PublicUserProfile, UserStatistic } from "./user.types.js";

export class UserRepository implements IUserRepository {
    async findPublicProfileByUsername(username: string): Promise<PublicUserProfile | null> {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
            select: {
                id: true,
                username: true,
                role: true,
                createdAt: true,
            },
        });
        return user;
    }
    async findCurrentUserById(id: string): Promise<CurrentUser | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                bio:true,
                avatar:true,
                role: true,
                isActive: true,
                createdAt: true,
            },
        });

        return user;
    }
    async findById(id: string): Promise<CurrentUser | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatar:true,
                bio:true,
                role: true,
                isActive: true,
                createdAt: true,
            },
        });

        return user;
    }

    async findByUsername(username: string): Promise<CurrentUser | null> {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                bio: true,
                role: true,
                isActive: true,
                createdAt: true,
            },
        });

        return user;
    }
    async updateProfile(
        id: string,
        data: {
            username?: string;
            bio?: string;
        },
    ): Promise<CurrentUser> {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data,
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                bio: true,
                role: true,
                isActive: true,
                createdAt: true,
            },
        });

        return user;
    }
    async getUserStatistics(userId: string): Promise<UserStatistic> {
                return {
            totalSolved: 0,
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
            totalSubmissions: 0,
            acceptedSubmissions: 0,
            acceptanceRate: 0,
        };
    }
    async updateAvatar(id: string, avatar: string): Promise<CurrentUser> {
        const user = await prisma.user.update({
            where:{id},
            data:{
                avatar
            },
            select:{
                id:true,
                username:true,
                email:true,
                avatar:true,
                bio:true,
                role:true,
                isActive:true,
                createdAt:true
            }
            
        })
        return user
    }
    async updateRole(id: string, role: "USER" | "ADMIN"): Promise<CurrentUser> {
        const user = await prisma.user.update({
            where:{
                id
            },
            data:{
                role
            },
            select:{
                id:true,
                username:true,
                email:true,
                avatar:true,
                bio:true,
                role:true,
                isActive:true,
                createdAt:true
            }
        })
        return user
    }
}

export const userRepository = new UserRepository();
