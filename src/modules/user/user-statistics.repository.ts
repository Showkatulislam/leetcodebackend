import { IUserStatisticsRepository } from "./user-statistics.interface.js";
import { UserStatistic } from "./user.types.js";

export class UserStatisticsRepository implements IUserStatisticsRepository {
    async getUserStatistics(userId: string): Promise<UserStatistic> {
        /**
         * Submission-based statistics will be implemented
         * after the Submission and Problem modules exist.
         */

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
}

export const userStatisticsRepository = new UserStatisticsRepository();
