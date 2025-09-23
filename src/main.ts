import "reflect-metadata";
import { AppModule } from "./app.module";
import { Factory } from "./core/factory";

async function bootstrap() {
  const app = Factory.create(AppModule);
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

bootstrap();
