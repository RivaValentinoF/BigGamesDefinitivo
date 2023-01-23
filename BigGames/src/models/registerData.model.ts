import { User } from "./user.model";

export class Data {
  constructor(
    public errore: string = "",
    public data: User = new User
  ) {}
}