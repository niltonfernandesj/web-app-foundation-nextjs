import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForWebServer();
});
describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieve application status info", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody.version).toBe("18.1");
      expect(responseBody.max_connections).toBe(100);
      expect(responseBody.active_connections).toBe(1);
    });
  });
});
