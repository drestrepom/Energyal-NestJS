import { Model } from 'mongoose';
import { IUser } from '../../interfaces/user.interface';
import { UserDto } from '../../classes/user-dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model);
    create(userDto: UserDto): Promise<IUser>;
    login(userDto: UserDto): Promise<IUser>;
    findAll(): Promise<[IUser]>;
}
