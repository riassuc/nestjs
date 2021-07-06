import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get('')
  getHello(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id : string) : Promise<User> {
    return this.UsersService.findOne(id);
  }

  /*
  @Delete(':id')
  removeUserById()
  */
}
