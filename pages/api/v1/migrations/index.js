import runner from "node-pg-migrate";
import database from "infra/database.js";
import { join } from "node:path";

async function runMigrations(request, response) {
  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(request.method)) {
    return response.status(405).end();
  }

  let connectedDbClient = await database.getConnectedClient();

  try {
    if (request.method === "GET") {
      const runnerResponse = await runner({
        ...getDefaultMigrationParameters(connectedDbClient),
        dryRun: true,
      });

      return response.status(200).json(runnerResponse);
    }

    if (request.method === "POST") {
      const runnerResponse = await runner({
        ...getDefaultMigrationParameters(connectedDbClient),
        dryRun: false,
      });

      if (runnerResponse.length > 0) {
        return response.status(201).json(runnerResponse);
      }

      return response.status(200).json(runnerResponse);
    }
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await connectedDbClient.end();
  }
}

function getDefaultMigrationParameters(connectedClient) {
  return {
    dbClient: connectedClient,
    migrationsTable: "pgmigrations",
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
  };
}

export default runMigrations;
