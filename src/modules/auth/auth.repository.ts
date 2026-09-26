import {
    EmailVerificationToken,
    PasswordResetToken,
    Prisma,
    RefreshToken,
    User,
} from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository {
    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                username,
            },
        });
    }
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({ data });
    }

    async createRefreshToken(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken> {
        return prisma.refreshToken.create({
            data,
        });
    }

    async findRefreshTokenByHash(tokenHash: string): Promise<RefreshToken | null> {
        return prisma.refreshToken.findUnique({
            where: {
                tokenHash,
            },
        });
    }

    async revokeRefreshToken(id: string): Promise<RefreshToken> {
        return prisma.refreshToken.update({
            where: {
                id,
            },
            data: {
                revokedAt: new Date(),
            },
        });
    }

    async createPasswordResetToken(
        data: Prisma.PasswordResetTokenCreateInput,
    ): Promise<PasswordResetToken> {
        return prisma.passwordResetToken.create({
            data,
        });
    }

    async findPasswordResetTokenByHash(tokenHash: string): Promise<PasswordResetToken | null> {
        return prisma.passwordResetToken.findUnique({
            where: {
                tokenHash,
            },
        });
    }
    async markPasswordResetTokenAsUsed(id: string): Promise<PasswordResetToken> {
        return prisma.passwordResetToken.update({
            where: {
                id,
            },
            data: {
                usedAt: new Date(),
            },
        });
    }

    async updateUserPassword(userId: string, password: string): Promise<User> {
        return prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                password,
            },
        });
    }
    async revokeAllRefreshTokens(userId: string): Promise<number> {
        const result = await prisma.refreshToken.updateMany({
            where: {
                userId,
                revokedAt: null,
            },
            data: {
                revokedAt: new Date(),
            },
        });

        return result.count;
    }

    async createEmailVerificationToken(
        data: Prisma.EmailVerificationTokenCreateInput,
    ): Promise<EmailVerificationToken> {
        return prisma.emailVerificationToken.create({
            data,
        });
    }

    async findEmailVerificationTokenByHash(
        tokenHash: string,
    ): Promise<EmailVerificationToken | null> {
        return prisma.emailVerificationToken.findUnique({
            where: {
                tokenHash,
            },
        });
    }
    async markEmailVerificationTokenAsUsed(id: string): Promise<EmailVerificationToken> {
        return prisma.emailVerificationToken.update({
            where: {
                id,
            },
            data: {
                usedAt: new Date(),
            },
        });
    }
    async verifyUserEmail(userId: string): Promise<User> {
        return prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isVerified: true,
            },
        });
    }
    async revokeEmailVerificationTokens(
    userId: string,
): Promise<number> {
    const result =
        await prisma.emailVerificationToken.updateMany({
            where: {
                userId,
                usedAt: null,
                revokedAt: null,
            },
            data: {
                revokedAt: new Date(),
            },
        });

    return result.count;
}
}

export const authRepository = new AuthRepository();
