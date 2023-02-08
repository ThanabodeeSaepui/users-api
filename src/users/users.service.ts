import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      fname: 'Safe',
      lname: 'Saepui',
      email: 'safe.saepui@gmail.com',
      password: '1234',
    },
    {
      id: 2,
      fname: 'John',
      lname: 'jack',
      email: 'john.jack@gmail.com',
      password: '9876',
    },
  ];

  async fineOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
