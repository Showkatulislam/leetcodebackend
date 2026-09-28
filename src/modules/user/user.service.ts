
import { AppError } from "../../errors/app-error.js";
import { userRepository } from "./user.repository.js";
import { PublicUserProfile } from "./user.types.js";

export class UserService {
    async getPublicProfile(
        username: string,
    ): Promise<PublicUserProfile> {
        const user =
            await userRepository.findPublicProfileByUsername(username);

        if (!user) {
            throw new AppError(
                "User not found",
                404,
                "USER_NOT_FOUND",
            );
        }

        return user;
    }
}

export const userService = new UserService();