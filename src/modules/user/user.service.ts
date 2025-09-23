import { Injectable } from "../../core/decorators";

@Injectable()
export class UserService {
  async findAll() {
    return { user: { name: "User", age: 30 } };
  }
}
