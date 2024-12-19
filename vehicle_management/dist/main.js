"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("dotenv");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (!process.env.PORT)
        throw new Error("Missing ENV PORT");
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map