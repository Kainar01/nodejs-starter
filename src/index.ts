import "reflect-metadata";
import { configureContainer, createServer } from "./server";
import { config } from "./config.service";

configureContainer(config).then((container) => createServer(container));
