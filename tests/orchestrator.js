import retry from "async-retry";
import database from "infra/database";

async function waitForWebServer() {
  await retry(getWebServerStatus, {
    retries: 100,
    maxTimeout: 1000,
  });
}

async function getWebServerStatus() {
  const response = await fetch("http://localhost:3000/api/v1/status");

  if (response.status !== 200) {
    throw "Indisponível";
  }

  return response.status;
}
async function cleanDatabase() {
  return await database.query(
    "drop schema public cascade; create schema public;",
  );
}

const orchestrator = {
  waitForWebServer,
  cleanDatabase,
};

export default orchestrator;
