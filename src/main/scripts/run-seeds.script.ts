require("ts-node/register");

const seedMigrationScript = require("./seeds.script");
seedMigrationScript.seedMigrator().then((value) => value.runAsCLI());
