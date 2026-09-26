import { AppError } from "../../errors/app-error.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { generateRandomToken, hashToken } from "../../utils/token.js";
import { authRepository } from "./auth.repository.js";
import { RegisterInput } from "./auth.types.js";
import {
    ForgotPasswordInput,
    LoginInput,
    LogoutInput,
    ResendVerificationInput,
    ResetPasswordInput,
    VerifyEmailInput,
} from "./auth.validation.js";

export class AuthService {
    async register(data: RegisterInput) {
        const existingEmail = await authRepository.findUserByEmail(data.email);

        if (existingEmail) {
            throw new AppError("User already Exist", 404, "EMAIL_EXIST");
        }
        const existingUsername = await authRepository.findUserByUsername(data.username);

        if (existingUsername) {
            throw new AppError("UserName already Exist", 404, "USERNAME_EXIST");
        }

        const passwordHash = await hashPassword(data.password);

        data.password = passwordHash;

        const verificationToken = generateRandomToken();

        const tokenHash = hashToken(verificationToken);

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const user = await authRepository.createUser(data);

        await authRepository.createEmailVerificationToken({
            tokenHash,
            expiresAt,
            user: {
                connect: {
                    id: user.id,
                },
            },
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };
    }

    async login(data: LoginInput) {
        const user = await authRepository.findUserByEmail(data.email);
        if (!user) {
            throw new AppError("Invalid email or password", 401, "");
        }

        if (!user.isActive) {
            throw new AppError("Account is inactive", 403, "");
        }

        const isPasswordValid = await verifyPassword(data.password, user.password);

        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401, "");
        }

        const accessToken = generateAccessToken({
            sub: user.id,
            role: user.role,
        });

        const refreshToken = generateRefreshToken({
            sub: user.id,
        });

        const refreshTokenHash = hashToken(refreshToken);

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await authRepository.createRefreshToken({
            tokenHash: refreshTokenHash,
            user: {
                connect: {
                    id: user.id,
                },
            },
            expiresAt,
        });

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                isActive: user.isActive,
                createdAt: user.createdAt,
            },
            accessToken,
            refreshToken,
        };
    }

    async logout(data: LogoutInput): Promise<void> {
        const tokenHash = hashToken(data.refreshToken);

        const refreshToken = await authRepository.findRefreshTokenByHash(tokenHash);

        if (!refreshToken) {
            return;
        }

        if (refreshToken.revokedAt) {
            return;
        }
        await authRepository.revokeRefreshToken(refreshToken.id);
    }
    async forgotPassword(data: ForgotPasswordInput): Promise<void> {
        const user = await authRepository.findUserByEmail(data.email);

        if (!user) {
            return;
        }

        const resetToken = generateRandomToken();

        const tokenHash = hashToken(resetToken);
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await authRepository.createPasswordResetToken({
            tokenHash,
            expiresAt,
            user: {
                connect: {
                    id: user.id,
                },
            },
        });
    }

    async resetPassword(data: ResetPasswordInput): Promise<void> {
        const tokenHash = hashToken(data.token);
        const resetToken = await authRepository.findPasswordResetTokenByHash(tokenHash);

        if (!resetToken) {
            throw new AppError("Invalid or expired reset token", 404, "");
        }

        if (resetToken.usedAt) {
            throw new AppError("Invalid or expired reset token", 404, "");
        }

        if (resetToken.expiresAt.getTime() < Date.now()) {
            throw new AppError("Invalid or expired reset token", 404, "");
        }

        const passwordHash = await hashPassword(data.password);

        await authRepository.updateUserPassword(resetToken.userId, passwordHash);
        await authRepository.markPasswordResetTokenAsUsed(resetToken.id);

        await authRepository.revokeAllRefreshTokens(resetToken.userId);
    }

    async verifyEmail(data: VerifyEmailInput): Promise<void> {
        const tokenHash = hashToken(data.token);

        const verificationToken = await authRepository.findEmailVerificationTokenByHash(tokenHash);

        if (!verificationToken) {
            throw new AppError("Invalid or expired verification token", 400, "");
        }

        if (verificationToken.usedAt || verificationToken.revokedAt) {
            throw new AppError("Invalid or expired verification token", 400, "");
        }
        if (verificationToken.expiresAt.getTime() < Date.now()) {
            throw new AppError("Invalid or expired verification token", 400, "");
        }

        await authRepository.verifyUserEmail(verificationToken.userId);

        await authRepository.markEmailVerificationTokenAsUsed(verificationToken.id);
    }
    async resendVerification(
    data: ResendVerificationInput,
): Promise<void> {
    const user =
        await authRepository.findUserByEmail(
            data.email,
        );

    if (!user) {
        return;
    }

    if (user.isVerified) {
        return;
    }

    await authRepository.revokeEmailVerificationTokens(
        user.id,
    );

    const verificationToken =
        generateRandomToken();

    const tokenHash =
        hashToken(verificationToken);

    const expiresAt =
        new Date(
            Date.now() +
            24 * 60 * 60 * 1000,
        );

    await authRepository.createEmailVerificationToken({
        tokenHash,
        expiresAt,
        user: {
            connect: {
                id: user.id,
            },
        },
    });

    // Send verificationToken by email.
}
}

export const authService = new AuthService();
