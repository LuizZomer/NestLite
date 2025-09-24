import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from "../../core/decorators";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query("page") page: string) {
    console.log(page);
    return this.userService.findAll();
  }

  @Get("/:id/test")
  async findById(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  // Para mostrar como funciona o Body e a rota aninhada
  @Post()
  async create(@Body() body: { name: string; age: number }) {
    return this.userService.create(body);
  }
}
