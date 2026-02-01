test("Retrieve application status info", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    const requestBody = await response.json();

    expect(response.status).toBe(200);
})