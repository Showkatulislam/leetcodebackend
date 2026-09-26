import { AppError } from "../../errors/app-error.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { hashToken } from "../../utils/token.js";
import { authRepository } from "./auth.repository.js";
import { RegisterInput } from "./auth.types.js";
import { LoginInput, LogoutInput } from "./auth.validation.js";

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

        const user = await authRepository.createUser(data);

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
            sub:user.id,
            role:user.role
        })

        const refreshToken =generateRefreshToken({
            sub:user.id
        })

        const refreshTokenHash = hashToken(refreshToken)

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await authRepository.createRefreshToken({
            tokenHash:refreshTokenHash,
            user:{
                connect:{
                    id:user.id
                }
            },
            expiresAt
        })

        return {
            user:{
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
            createdAt: user.createdAt,
        },
        accessToken,
        refreshToken
        }
    }

    async logout(data:LogoutInput):Promise<void>{
        const tokenHash = hashToken(data.refreshToken);

        const refreshToken = await authRepository.findRefreshTokenByHash(tokenHash);

        if(!refreshToken){
            return;
        }

        if(refreshToken.revokedAt){
            return
        }
        await authRepository.revokeRefreshToken(refreshToken.id);
    }
}

export const authService = new AuthService();
