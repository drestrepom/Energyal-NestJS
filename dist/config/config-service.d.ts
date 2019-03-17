export interface EnvConfig {
    [key: string]: string;
}
export declare class ConfigService {
    private readonly envConfig;
    constructor(filePath: string);
    private validateInput;
    get(key: string): string;
    readonly isApiAuthEnabled: boolean;
}
