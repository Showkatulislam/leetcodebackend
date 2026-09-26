
import bcrypt from 'bcryptjs';
import prisma from './../src/lib/prisma';
import { languages, problems, tags } from './../src/dummy/data';
import { Difficulty } from '../generated/prisma/enums';
import { Prisma } from '../generated/prisma/client';

async function seedLanguage(tx: Prisma.TransactionClient): Promise<void> {
    for (const language of languages) {
        await tx.language.upsert({
            where: {
                slug: language.slug,
            },
            update: {
                name: language.name,
                version: language.version,
                isActive: true,
            },
            create: language,
        });
    }
}

async function seedTags(tx: Prisma.TransactionClient): Promise<void> {
    for (const tag of tags) {
        await tx.tag.upsert({
            where: {
                slug: tag.slug,
            },
            update: {
                name: tag.name,
            },
            create: tag,
        });
    }
}

async function seedUsers(tx: Prisma.TransactionClient): Promise<void> {
    const passwordHash = await bcrypt.hash('Admin@123456', 12);

    await tx.user.upsert({
        where: {
            email: 'admin@example.com',
        },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@example.com',
            password: passwordHash,
            role: 'ADMIN',
            isActive: true,
        },
    });
}

function mapDifficulty(difficultyStr: string): Difficulty {
    switch (difficultyStr.toUpperCase()) {
        case 'EASY':
            return Difficulty.EASY;
        case 'MEDIUM':
            return Difficulty.MEDIUM;
        case 'HARD':
            return Difficulty.HARD;
        default:
            return Difficulty.EASY; // Fallback default
    }
}

async function seedProblems(tx: Prisma.TransactionClient): Promise<void> {
    for (const problem of problems) {
        const difficultyEnum = mapDifficulty(problem.difficulty);

        await tx.problem.upsert({
            where: {
                slug: problem.slug,
            },
            update: {
                title: problem.title,
                description: problem.description,
                difficulty: difficultyEnum,
                isPublished: problem.isPublished,
            },
            create: {
                title: problem.title,
                slug: problem.slug,
                description: problem.description,
                difficulty: difficultyEnum,
                isPublished: problem.isPublished,
                timeLimit: 1000,   // Default time limit (ms)
                memoryLimit: 256,  // Default memory limit (MB)
            },
        });
    }
}

async function main(): Promise<void> {
    console.log("🌱 Starting database seed...");

    await prisma.$transaction(
        async (tx) => {
            await seedLanguage(tx);
            await seedTags(tx);
            await seedUsers(tx);
            await seedProblems(tx);
        },
        {
            timeout: 30000, // 30-second transaction timeout
        }
    );

    console.log("🌱 Database seed completed.");
}

main()
    .catch((error) => {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// npx prisma db seed