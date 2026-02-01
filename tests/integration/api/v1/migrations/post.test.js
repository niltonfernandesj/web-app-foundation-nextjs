test("Retrieve pending migrations to run", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST"
    });
    const responseBody = await response.json();

    expect(response.status).toBe(201);
    expect(Array.isArray(responseBody)).toBe(true);
})