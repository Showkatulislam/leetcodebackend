import { CurrentUser, PublicUserProfile } from "./user.types.js";

export interface IUserRepository {
    findPublicProfileByUsername(
        username: string,
    ): Promise<PublicUserProfile | null>;

    findCurrentUserById(
        id: string,
    ): Promise<CurrentUser | null>;

    findById(
        id: string,
    ): Promise<CurrentUser | null>;

    findByUsername(
        username: string,
    ): Promise<CurrentUser | null>;

    updateProfile(
        id: string,
        data: {
            username?: string;
            bio?: string;
        },
    ): Promise<CurrentUser>;

    updateAvatar(
        id: string,
        avatar: string,
    ): Promise<CurrentUser>;

    updateRole(
        id:string,
        role:"USER" | "ADMIN"
    ):Promise<CurrentUser>;
}