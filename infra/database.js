import { Client } from 'pg';

async function query() {
    const client = new Client({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
    });
    await client.connect();
    const response = await client.query('SELECT 1+1 as sum;');
    await client.end();

    return response;
}

export default query;