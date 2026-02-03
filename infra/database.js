import { Client } from 'pg';

async function query(query) {
    let client;
    try {
        client = await getConnectedClient();
        const response = await client.query(query);
        return response;
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.end();
    }
}

async function getConnectedClient() {
    const client = new Client({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        ssl: process.env.NODE_ENV && process.env.NODE_ENV === "production" ? true : false,
    });

    await client.connect();

    return client;
}

export default {
    query,
    getConnectedClient,
};