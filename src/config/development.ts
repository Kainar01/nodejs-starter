import { DeepPartial } from "../types";
import { IConfig } from "./constraint";

const configProduction: DeepPartial<IConfig> = {
	node_env: "dev",
	auth: {
		disabled: false,
		jwtTokenLife: 525600 * 60, // this is a year
	},
	typeOrm: {
		connectionOptions: {
			host: "127.0.0.1",
			port: 9002,
			database: "test_db",
			username: "postgres",
			password: "change-in-production",
			migrationsRun: true,
			ssl: false,
		},
	},
};

module.exports = configProduction;
