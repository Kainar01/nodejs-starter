import { config } from "./config.service";
import {
  useContainer as useContainerForRouting,
  useExpressServer,
} from "routing-controllers";
import { controllers } from "./controllers";
import {
  getContainer,
  createDBConnection,
  useSwaggerUI,
  makeMinio,
} from "./utils";
import { Connection, useContainer as useContainerForTypeOrm } from "typeorm";
import express from "express";
import { DependencyContainer } from "tsyringe";
import { ConfigWrapper } from "./config/constraint";
import { makeAuthMiddleware, makeAuthCheckers } from "./middlewares";
import cookieParser from "cookie-parser";
import cors from "cors";
import { useAdminBro } from "./utils/adminbro";
import { Client } from "minio";

export const configureContainer = async (config: config.IConfig) => {
  // GET CONTAINER AND REGISTER CONFIG
  const container = getContainer();
  container.register(ConfigWrapper, { useValue: new ConfigWrapper(config) });
  // GET DB CONNECTION
  const connection = await createDBConnection(container);
  container.register(Connection, { useValue: connection });

  const minioClient = await makeMinio(container);
  container.register(Client, { useValue: minioClient });

  return container;
};

export const createServer = async (container: DependencyContainer) => {
  const { config } = container.resolve(ConfigWrapper);

  useContainerForRouting(
    { get: (x) => container.resolve(x) },
    { fallback: false, fallbackOnErrors: false }
  );
  useContainerForTypeOrm(
    { get: (x) => container.resolve(x as any) },
    { fallback: false, fallbackOnErrors: false }
  );

  const serverConfig = config.getTyped("express");

  const app = express();

  app.use(cors({ origin: true, credentials: true }));

  app.use(cookieParser()); // cookie parser

  app.use(makeAuthMiddleware(container)); // auth middleware

  useAdminBro(app, container); // admin bro router
  useSwaggerUI(app, container); // swagger ui

  useExpressServer(app, {
    routePrefix: serverConfig.routePrefix,
    controllers,
    classTransformer: true,
    validation: true,
    ...makeAuthCheckers(container),
  });

  app.listen(serverConfig.port);

  console.log("Express server listening on port " + serverConfig.port);

  return app;
};
