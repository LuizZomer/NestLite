import { Injectable } from "../../../core/decorators";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async create(body: { name: string; age: number }) {
    const id = Date.now().toString();
    return this.userRepository.create({ id, ...body });
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }
}
