import { UserRole } from "../../../generated/prisma/enums.js"

export interface PublicUserProfile{
    id:string,
    username:string,
    role:UserRole,
    createdAt:Date,
}