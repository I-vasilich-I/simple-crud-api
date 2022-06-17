import { v4 as uuidV4 } from 'uuid';
import { IUpdateUser, IUser } from "../types";

class DataBase {
  data: Map<IUser['id'], IUser>;

  constructor() {
    this.data = new Map<string, IUser>();
  }

  get users(): IUser[] {
    return [...this.data.values()];
  }

  getUser(userId: IUser['id']): IUser | null {
    return this.data.get(userId) || null;
  }

  createUser({ username, age, hobbies }: Omit<IUser, 'id'>): IUser {
    const user: IUser = {
      id: uuidV4(),
      username,
      age,
      hobbies
    }

    this.data.set(user.id, user);

    return user;
  }

  updateUser(user: IUpdateUser): IUser | null {
    const userInDB = this.getUser(user.id);

    if (!userInDB) {
      return null;
    };

    const newUser = {...userInDB, ...user};
    this.data.set(user.id, newUser);

    return newUser;
  }

  deleteUser(userId: IUser['id']): boolean {
    return this.data.delete(userId);
  }
}

export { DataBase };