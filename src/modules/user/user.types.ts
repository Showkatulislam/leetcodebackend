// user.types.ts
import { UserRole } from "../../../generated/prisma/enums.js";

export interface PublicUserProfile {
  id: string;
  username: string;
  role: UserRole;
  createdAt: Date;
}

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  avatar: string | null; // Changed from 'string' to 'string | null'
  role: UserRole;        // Strongly typed to UserRole enum instead of string
  isActive: boolean;
  createdAt: Date;
}

export interface UserStatistic {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions: number;
  acceptedSubmissions: number;
  acceptanceRate: number;
}