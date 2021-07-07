import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository, SimpleConsoleLogger } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import {getConnection} from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  addUser(userData: AddUserDto): Promise<User> {
    console.log(userData);
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  updateUser(id: string, userData: UpdateUserDto){
    getConnection()
    .createQueryBuilder()
    .update(User)
    .set(userData)
    .where("id = :id", { id: id })
    .execute();
    return "updated"
  }
}