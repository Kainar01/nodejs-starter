import { DeepPartial } from "../types";
import { IConfig } from "./constraint";

const configProduction: DeepPartial<IConfig> = {
  node_env: "produciton",
  auth: {
    disabled: false,
    jwtTokenLife: 525600 * 60, // this is a year
  },
  minio: {
    publicUrl: "http://34.142.61.196:9000",
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
    },
  },
};

module.exports = configProduction;
