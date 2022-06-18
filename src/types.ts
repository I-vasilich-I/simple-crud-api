interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

type IUserWithoutId = Omit<IUser, 'id'>;

export { IUser, IUserWithoutId }