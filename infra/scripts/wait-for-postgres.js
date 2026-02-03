const { exec } = require("node:child_process");

process.stdout.write("\n\n⏱️ Aguardando o Postgres aceitar conexões.");
checkPostgres();

function checkPostgres() {
  exec(
    "docker exec postgres-dev pg_isready --host localhost",
    (error, stdout) => {
      if (stdout.includes("accepting connections")) {
        console.log("\n\n 🟢 Postgres está pronto e aguardando conexões.");
        return;
      }

      process.stdout.write(".");
      checkPostgres();
    },
  );
}
