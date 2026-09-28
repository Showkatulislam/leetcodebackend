import { PublicUserProfile } from "./user.types.js";

export interface IUserRepository{
    findPublicProfileByUsername(
        username:string
    ):Promise<PublicUserProfile | null>
}