import { Module } from "../../core/decorators";
import { UserController } from "./user.controller";

@Module({ controllers: [UserController] })
export class UserModule {}
