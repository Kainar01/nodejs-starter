import { ConfigWrapper } from "../config/constraint";
import { DependencyContainer } from "tsyringe";
import { createConnection } from "typeorm";
import { entities } from "../models";

export const createDBConnection = async (container: DependencyContainer) =>
  createConnection({
    ...container.resolve(ConfigWrapper).config.getTyped("typeOrm")
      .connectionOptions,
    entities,
  }).then((connection) => {
    for (const entity of entities) {
      entity.useConnection(connection);
    }
    return connection;
  });

export const configureDB = async (container: DependencyContainer) => {
  const connection = await createDBConnection(container);
  return connection;
};
