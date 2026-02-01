import runner from 'node-pg-migrate';
import { join } from 'node:path';


async function runMigrations(request, response) {

    if (request.method === "GET") {
        const runnerResponse = await runner({
            databaseUrl: process.env.DATABASE_URL,
            migrationsTable: "pgmigrations",
            dir: join("infra", "migrations"),
            direction: "up",
            dryRun: true,
        });

        return response.status(200).json(runnerResponse);
    }

    if (request.method === "POST") {
        const runnerResponse = await runner({
            databaseUrl: process.env.DATABASE_URL,
            migrationsTable: "pgmigrations",
            dir: join("infra", "migrations"),
            direction: "up",
            dryRun: false,
        });

        return response.status(201).json(runnerResponse);
    }

    return response.status(405).end();
}

export default runMigrations;
