import { AppError } from "../../errors/app-error.js";
import { hashPassword } from "../../utils/password.js";
import { authRepository } from "./auth.repository.js";
import { RegisterInput } from "./auth.types.js";

export class AuthService {
    async register(
        data:RegisterInput
    ){
        const existingEmail = await authRepository.findUserByEmail(data.email);

        if(existingEmail){
            throw new AppError("User already Exist",404,"EMAIL_EXIST")
        }
        const existingUsername = await authRepository.findUserByUsername(data.username)

        if(existingUsername){
            throw new AppError("UserName already Exist",404,"USERNAME_EXIST")    
        }

        const passwordHash = await hashPassword(data.password);

        data.password = passwordHash

        const user = await authRepository.createUser(data)

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
}

export const authService = new AuthService()