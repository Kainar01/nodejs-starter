import { Express } from "express";
import { DependencyContainer } from "tsyringe";
import { Connection } from "typeorm";
import AdminBro from "admin-bro";
import AdminBroExpress from "@admin-bro/express";
import { Database, Resource } from "@admin-bro/typeorm";
import { resources } from "../models";

AdminBro.registerAdapter({ Database, Resource });

export const useAdminBro = (app: Express, container: DependencyContainer) => {
  const connection = container.resolve(Connection);

  const adminBro = new AdminBro({
    databases: [connection],
    resources,
    rootPath: "/admin",
  });

  const router = AdminBroExpress.buildRouter(adminBro);
  app.use(adminBro.options.rootPath, router);
};
