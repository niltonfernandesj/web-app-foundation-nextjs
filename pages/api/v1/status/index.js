import database from 'infra/database.js';

async function status(request, response) {

    response.status(200).json({
        version: await getDatabaseVersion(),
        max_connections: await getDatabaseMaxConnections(),
        active_connections: await getDatabaseActiveConnections(),
    });
}

export default status;

async function getDatabaseVersion() {
    const response = await database.query("SHOW server_version");
    const version = response.rows[0].server_version;
    const versionNumber = version ? version.split(" ")[0] : "";

    return versionNumber;
}

async function getDatabaseMaxConnections() {
    const response = await database.query("SHOW max_connections");
    const maxConnections = response.rows[0].max_connections;

    return Number(maxConnections);
}

async function getDatabaseActiveConnections() {
    const response = await database.query({
        text: "SELECT count(*) FROM pg_stat_activity WHERE datname=$1",
        values: [process.env.POSTGRES_DB]
    });
    const activeConnections = response.rows[0].count;

    return Number(activeConnections);
}