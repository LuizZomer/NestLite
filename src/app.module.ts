import { Module } from "./core/decorators";
import { UserModule } from "./examples/modules/user/user.module";

@Module({ imports: [UserModule], controllers: [] })
export class AppModule {}
