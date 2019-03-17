"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs = require("fs");
const Joi = require("joi");
class ConfigService {
    constructor(filePath) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }
    validateInput(envConfig) {
        const envVarsSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            PORT: Joi.number().default(3000),
            API_AUTH_ENABLED: Joi.boolean().required(),
        });
        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
    get(key) {
        return this.envConfig[key];
    }
    get isApiAuthEnabled() {
        return Boolean(this.envConfig.API_AUTH_ENABLED);
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config-service.js.map