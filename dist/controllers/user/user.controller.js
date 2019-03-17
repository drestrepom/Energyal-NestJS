"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../services/user/user.service");
const user_dto_1 = require("../../classes/user-dto");
const delete_blank_space_pipe_1 = require("../../pipes/delete-blank-space.pipe");
const jwt = require("jsonwebtoken");
let UserController = class UserController {
    constructor(userSerice) {
        this.userSerice = userSerice;
    }
    register(user) {
        console.log('new USer');
        return this.userSerice.create(user).then(value => {
            return {
                ok: true,
                user: value,
            };
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userSerice.login(user).then(value => {
                const Authorization = jwt.sign({ user: value }, process.env.SEED, {
                    expiresIn: process.env.EXPITARION,
                });
                return {
                    ok: true,
                    user: value,
                    Authorization,
                };
            });
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body(delete_blank_space_pipe_1.DeleteBlankSpacePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    common_1.Post(':login'),
    __param(0, common_1.Body(delete_blank_space_pipe_1.DeleteBlankSpacePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map