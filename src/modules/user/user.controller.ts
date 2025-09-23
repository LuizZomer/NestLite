import { Controller, Get } from "../../core/decorators";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  async findAll() {
    return this.userService.findAll();
  }
}
