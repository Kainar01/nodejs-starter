import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { DependencyContainer } from "tsyringe";
import { Express } from "express";
import { getMetadataArgsStorage } from "routing-controllers";
import swaggerUI from "swagger-ui-express";
import { ConfigWrapper } from "../config/constraint";

export const useSwaggerUI = (app: Express, container: DependencyContainer) => {
	const { config } = container.resolve(ConfigWrapper);
	const schemas = validationMetadatasToSchemas({
		refPointerPrefix: "#/components/schemas/",
	});
	app.use(
		config.getTyped("swagger").path,
		swaggerUI.serve,
		swaggerUI.setup(
			routingControllersToSpec(
				getMetadataArgsStorage(),
				{},
				{
					openapi: "3.0.0",
					components: { schemas },
				}
			),
		)
	);
};
