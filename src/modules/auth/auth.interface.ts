import {
    EmailVerificationToken,
    PasswordResetToken,
    Prisma,
    RefreshToken,
    User,
} from "../../../generated/prisma/client.js";

export interface IAuthRepository {
    findUserByEmail(email: string): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    createRefreshToken(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken>;
    findRefreshTokenByHash(tokenHash: string): Promise<RefreshToken | null>;
    revokeRefreshToken(id: string): Promise<RefreshToken>;
    createPasswordResetToken(
        data: Prisma.PasswordResetTokenCreateInput,
    ): Promise<PasswordResetToken>;

    findPasswordResetTokenByHash(tokenHash: string): Promise<PasswordResetToken | null>;
    markPasswordResetTokenAsUsed(id: string): Promise<PasswordResetToken>;
    updateUserPassword(userId: string, password: string): Promise<User>;

    revokeAllRefreshTokens(userId: string): Promise<number>;

    createEmailVerificationToken(
        data: Prisma.EmailVerificationTokenCreateInput,
    ): Promise<EmailVerificationToken>;

    findEmailVerificationTokenByHash(tokenHash: string): Promise<EmailVerificationToken | null>;

    markEmailVerificationTokenAsUsed(id: string): Promise<EmailVerificationToken>;

    verifyUserEmail(userId: string): Promise<User>;
    revokeEmailVerificationTokens(
    userId: string,
): Promise<number>;
}
