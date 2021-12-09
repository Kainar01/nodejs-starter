import { IConfig } from "./constraint";

const config: IConfig = {
  node_env: "dev",
  auth: {
    jwtSecret: "change-in-production",
    disabled: false,
    jwtTokenLife: 3600,
    jwtRefreshTokenLife: 5 * 24 * 3600,
    cookieSecure: false,
  },
  express: {
    port: 3001,
    routePrefix: "",
    cors: {
      origin: ["*", "http://localhost:3001"],
      methods: ["POST", "GET", "PUT"],
    },
  },
  minio: {
    connection: {
      endPoint: "localhost",
      port: 9000,
      accessKey: "test",
      secretKey: "change-in-production",
      useSSL: false,
    },
    bucket: "test",
    publicUrl: "http://localhost:9000"
  },
  typeOrm: {
    connectionOptions: {
      type: "postgres",
      host: "127.0.0.1",
      port: 9002,
      database: "test_db",
      username: "postgres",
      password: "change-in-production",
      migrationsRun: true,
      ssl: false,
      entities: ["src/models/*.model.{ts,js}"],
      migrations: ["src/db/migration/**/*.{ts,js}"],
    },
  },
  swagger: {
    path: "/api-docs",
  },
};

module.exports = config;
