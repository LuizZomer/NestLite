import { Body, Controller, Get, Post } from "../../core/decorators";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // Para mostrar como funciona o Body e a rota aninhada
  @Post("/create")
  async create(@Body() body: { name: string; age: number }) {
    console.log(body);
    return this.userService.create(body);
  }
}
