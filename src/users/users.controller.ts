import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RegistrationStatus } from './interfaces/regisration-status.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    return await this.userService.create(createUserDto);
  }
}
