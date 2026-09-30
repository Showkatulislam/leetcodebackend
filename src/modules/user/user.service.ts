import { UserRole } from "../../../generated/prisma/enums.js";
import { AppError } from "../../errors/app-error.js";
import { userRepository } from "./user.repository.js";
import { CurrentUser, PublicUserProfile, UserStatistic } from "./user.types.js";

export class UserService {
    async getPublicProfile(username: string): Promise<PublicUserProfile> {
        const user = await userRepository.findPublicProfileByUsername(username);

        if (!user) {
            throw new AppError("User not found", 404, "USER_NOT_FOUND");
        }

        return user;
    }
    async getCurrentUser(userId: string): Promise<CurrentUser> {
        const user = await userRepository.findCurrentUserById(userId);

        if (!user) {
            throw new AppError("User not found", 404, "USER_NOT_FOUND");
        }

        return user;
    }
    async updateProfile(
        userId: string,
        data: {
            username?: string;
            bio?: string;
        },
    ): Promise<CurrentUser> {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError("User not found", 404, "USER_NOT_FOUND");
        }

        if (data.username && data.username !== user.username) {
            const existingUser = await userRepository.findByUsername(data.username);

            if (existingUser) {
                throw new AppError("Username is already taken", 409, "USERNAME_ALREADY_EXISTS");
            }
        }

        return userRepository.updateProfile(userId, data);
    }

    async updateAvatar(
        userId:string,
        avatarUrl:string
    ):Promise<CurrentUser>{
        const user = await userRepository.findById(userId);

        if(!user){
            throw new AppError(
                "User not found",
                404,
                "USER_NOT_FOUND"
            )
        }

        return userRepository.updateAvatar(
            userId,
            avatarUrl
        )
    }

    async updateUserRole(userId:string,role:UserRole){
        const user = await userRepository.findById(userId);

        if(!user){
            throw new AppError(
                "User not found",
                404,
                "USER_NOT_FOUND"
            )
        }
        return userRepository.updateRole(
            userId,
            role
        )
    }
}

export const userService = new UserService();
