import { UserStatistic } from "./user.types.js";

export interface IUserStatisticsRepository {
    getUserStatistics(userId: string): Promise<UserStatistic>;
}
