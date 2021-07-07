import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity'
import { AddUserDto } from './dto/add-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  @Post()
  addUser(@Body() userData: AddUserDto): Promise<User>{
    return this.UsersService.addUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id') id : string) : Promise<User> {
    return this.UsersService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  removeUserById(@Param('id') id: string){
    return this.UsersService.remove(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id:string, @Body() userData: UpdateUserDto){
    return this.UsersService.updateUser(id, userData);
  }
  
}
