interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

interface IUpdateUser {
  id: string;
  username?: string;
  age?: number;
  hobbies?: string[];
}

export { IUser, IUpdateUser }