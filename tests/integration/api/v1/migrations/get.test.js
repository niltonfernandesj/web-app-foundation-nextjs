import query from 'infra/database';

beforeAll(async () => {
    await cleanDatabase();
})

test("Retrieve pending migrations to run", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
})

async function cleanDatabase() {
    return await query("drop schema public cascade; create schema public;");
}