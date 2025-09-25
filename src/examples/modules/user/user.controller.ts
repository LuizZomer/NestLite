import { Request } from "express";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
} from "../../../core/decorators";
import { UserService } from "./user.service";
import { HttpStatus } from "../../../core/enum/http-status.enum";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query("page") page: string,
    @Req() req: Request & { middleware: string }
  ) {
    console.log(page);
    console.log("middleware", req.middleware);
    return this.userService.findAll();
  }

  @Get("/:id/test")
  async findById(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  // Para mostrar como funciona o Body e a rota aninhada
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: { name: string; age: number }) {
    return this.userService.create(body);
  }
}
