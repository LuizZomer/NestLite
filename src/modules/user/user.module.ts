import { Module } from "../../core/decorators";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({ controllers: [UserController], providers: [UserService] })
export class UserModule {}
