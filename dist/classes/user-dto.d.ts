import { IUser } from '../interfaces/user.interface';
import { Electrodomestic } from '../interfaces/electrodomestic.interface';
export declare class UserDto implements IUser {
    constructor(user?: IUser);
    city: string;
    electrodomestics: [Electrodomestic];
    email: string;
    name: string;
    password: string;
    status: boolean;
}
