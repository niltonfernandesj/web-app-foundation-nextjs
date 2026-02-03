import retry from 'async-retry';

export default async function waitForWebServer() {
    await retry(getWebServerStatus, {
        retries: 100,
        maxTimeout: 1000
    });
}

async function getWebServerStatus() {
    const response = await fetch("http://localhost:3000/api/v1/status");

    if (response.status !== 200) {
        throw "Indisponível";
    }

    return response.status;
}