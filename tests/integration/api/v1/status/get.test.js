test("Retrieve application status info", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.query).toBe(2);
})