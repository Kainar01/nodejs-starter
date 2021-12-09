import { config } from "../config.service";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export interface IConfig {
  node_env: string;
  auth: AuthConfig;
  express: {
    port: number;
    routePrefix: string;
    ip?: string;
    cors: {
      origin: string[] | string | boolean;
      methods: string[];
    };
  };
  minio: {
    connection: {
      endPoint: string;
      port: number;
      useSSL: boolean;
      accessKey: string;
      secretKey: string;
    };
    bucket: string;
    publicUrl: string;
  };
  typeOrm: {
    connectionOptions: PostgresConnectionOptions;
  };
  swagger: {
    path: string;
  };
}

export class ConfigWrapper {
  public constructor(public config: config.IConfig) {}
}

export type AuthConfig = {
  jwtSecret: string;
  jwtTokenLife: number;
  jwtRefreshTokenLife: number;
  cookieSecure: boolean;
  disabled: boolean;
};
