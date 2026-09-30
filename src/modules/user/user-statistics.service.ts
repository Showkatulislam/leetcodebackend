import { AppError } from "../../errors/app-error.js";
import { userRepository } from "./user.repository.js";
import { userStatisticsRepository } from "./user-statistics.repository.js";
import { UserStatistic } from "./user.types.js";

export class UserStatisticsService {
    async getUserStatistics(
        userId: string,
    ): Promise<UserStatistic> {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                "User not found",
                404,
                "USER_NOT_FOUND",
            );
        }

        return userStatisticsRepository.getUserStatistics(
            userId,
        );
    }
}

export const userStatisticsService =
    new UserStatisticsService();