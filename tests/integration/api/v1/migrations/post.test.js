import database from "infra/database";
import waitForWebServer from "tests/orchestrator.js";

beforeAll(async () => {
  await waitForWebServer();
  await cleanDatabase();
});

test("Running pending migrations", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const responseBody = await response.json();

  expect(response.status).toBe(201);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

async function cleanDatabase() {
  return await database.query(
    "drop schema public cascade; create schema public;",
  );
}
