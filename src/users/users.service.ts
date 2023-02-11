import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  saltRounds: number = 10;
  async create(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    const newUser: CreateUserDto = createUserDto;
    // Hash Password
    hash(createUserDto.password, this.saltRounds, (err, hash) => {
      if (err) {
        return (status = {
          success: false,
          message: err.message,
        });
      }
      newUser.password = hash;

      try {
        this.usersRepository.insert(newUser); // INSERT to database
      } catch (err) {
        let errMessage =
          err.driverError.code === 'ER_DUP_ENTRY'
            ? 'Email already in used'
            : 'Error';
        return (status = {
          success: false,
          message: errMessage,
        });
      }
    });

    return status;
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }
}
