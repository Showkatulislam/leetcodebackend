import { PasswordResetToken, Prisma, RefreshToken, User } from "../../../generated/prisma/client.js";

export interface IAuthRepository {
    findUserByEmail(email: string): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    createRefreshToken(
        data:Prisma.RefreshTokenCreateInput
    ):Promise<RefreshToken>;
    findRefreshTokenByHash(
        tokenHash:string
    ):Promise<RefreshToken | null>;
    revokeRefreshToken(
        id:string
    ):Promise<RefreshToken>
    createPasswordResetToken(
    data: Prisma.PasswordResetTokenCreateInput,
): Promise<PasswordResetToken>;
}
