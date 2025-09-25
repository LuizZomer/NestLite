import { Module } from "../../../core/decorators";
import { MiddlewareConsumer } from "../../../core/middlewares/consumer";
import { NestLiteModule } from "../../../core/types";
import { LoggerMiddleware } from "../../middlewares/logger.middleware";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule implements NestLiteModule {
  configure(config: MiddlewareConsumer): void {
    config.apply(LoggerMiddleware).forRoutes("/user");
  }
}
