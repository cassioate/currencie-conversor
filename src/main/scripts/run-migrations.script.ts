require("ts-node/register");

const migrationScript = require("./migrations.script");
migrationScript.migrator().then((value) => value.runAsCLI());
