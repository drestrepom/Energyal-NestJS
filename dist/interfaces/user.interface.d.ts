import { Electrodomestic } from './electrodomestic.interface';
export declare enum Citys {
    Medellín = "Medell\u00EDn",
    Cali = "Cali",
    Bogota = "Bogota",
    Yarumal = "Yarumal",
    SantaRosa = "Santa Rosa",
    LaCeja = "La Ceja",
    RíoNegro = "R\u00EDo Negro"
}
export interface IUser {
    name: string;
    email: string;
    password: string;
    city?: string;
    electrodomestics?: [Electrodomestic];
    status?: boolean;
}
