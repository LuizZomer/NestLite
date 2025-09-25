import { Injectable } from "../../../core/decorators";

@Injectable()
export class UserRepository {
  private user: { id: string; name: string; age: number }[] = [
    { id: "1", name: "Jane Doe", age: 25 },
    { id: "2", name: "John Doe", age: 40 },
  ];

  findAll() {
    return this.user;
  }

  findById(id: string) {
    return this.user.find((user) => user.id === id);
  }

  create(user: { id: string; name: string; age: number }) {
    this.user.push(user);
    return user;
  }
}
