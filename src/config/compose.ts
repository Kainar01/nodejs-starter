import { DeepPartial } from "../types";
import { IConfig } from "./constraint";

const configProduction: DeepPartial<IConfig> = {
  node_env: "compose",
  minio: {
    connection: {
      endPoint: "minio",
      port: 9000,
      accessKey: "test",
      secretKey: "change-in-production",
      useSSL: false,
    },
  },
  typeOrm: {
    connectionOptions: {
      host: "db",
      port: 5432,
      database: "test_db",
      username: "postgres",
      password: "change-in-production",
      migrationsRun: true,
      ssl: false,
      migrations: ["src/db/migration/**/*.{ts,js}"],
      entities: ["src/models/*.model.{ts, js}"],
    },
  },
};

module.exports = configProduction;
