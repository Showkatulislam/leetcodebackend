import { Prisma, User } from "../../../generated/prisma/client.js";

export interface IAuthRepository{
    findUserByEmail(email:string):Promise<User|null>
    findUserByUsername(username:string):Promise<User | null>
    createUser(data:Prisma.UserCreateInput):Promise<User>
}