"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
        if (process.env.NODE_ENV === 'dev') {
            process.env.urlDB = 'mongodb://localhost:27017/enrgyal';
        }
        else {
            process.env.urlDB = 'mongodb+srv://admin:1193120855@cluster0-xjwrt.mongodb.net/enrgyal?retryWrites=true';
        }
        process.env.EXPITARION = process.env.EXPITARION || '12h';
        process.env.SEED = process.env.SEED || 'chucho';
        process.env.urlDB = process.env.urlDB || 'mongodb://localhost:27017/enrgyal';
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        yield app.listen(process.env.PORT || 3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map