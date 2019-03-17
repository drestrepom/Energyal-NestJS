import { UserService } from '../../services/user/user.service';
import { UserDto } from '../../classes/user-dto';
export declare class UserController {
    private userSerice;
    constructor(userSerice: UserService);
    register(user: UserDto): Promise<{
        ok: boolean;
        user: import("../../interfaces/user.interface").IUser;
    }>;
    login(user: UserDto): Promise<{
        ok: boolean;
        user: import("../../interfaces/user.interface").IUser;
        Authorization: any;
    }>;
}
