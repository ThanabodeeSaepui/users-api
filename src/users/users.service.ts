import {
  ConflictException,
  HttpExceptionOptions,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let status = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.usersRepository.insert(createUserDto);
    } catch (err) {
      let errMessage =
        err.driverError.code === 'ER_DUP_ENTRY'
          ? 'Email already in used'
          : 'Error';
      status = {
        success: false,
        message: errMessage,
      };
    }

    return status;
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }
}
