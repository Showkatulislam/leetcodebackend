import { Problem } from "../../../generated/prisma/client.js";
import type { CreateProblemInput, UpdateProblemInput } from "./problem.interface.js";

export interface IProblemRepository {
    create(data: CreateProblemInput): Promise<Problem>;

    findById(id: string): Promise<Problem | null>;

    findBySlug(slug: string): Promise<Problem | null>;

    update(id: string, data: UpdateProblemInput): Promise<Problem>;

    delete(id: string): Promise<Problem>;

    findAll(): Promise<Problem[]>;

    count(): Promise<number>;
}
