import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role) private readonly repo: Repository<Role>
  ){}

  async findOneById(id: string) {
    return await this.repo.findOne({
      where: {
        id: id
      }
    });
  }

  async findOneByName(roleName: string) {
    return await this.repo.findOne({
      where: {
        name: roleName
      }
    });
  }

  async findAll(){
    return await this.repo.find()
  }
}
