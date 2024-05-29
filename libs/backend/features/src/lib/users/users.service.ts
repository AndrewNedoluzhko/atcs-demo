import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { RoleEnum } from '@mtfs/shared/enums';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly rolesService: RolesService    
  ){}
  async create(createUserDto: CreateUserDto) {

    //check user by email to avoid dublicate email
    const checkUserByEmail = await this.repo.findOne({
      where: {
        email: createUserDto.email
      }
    });

    if (checkUserByEmail){
      throw new ConflictException('User with this email exist');
    } else {
      const user = new User();
      //Check if roleId or role object was entered
      let role;
      
      if (createUserDto.roleId) {
        //check role by id
        role = await this.rolesService.findOneById(createUserDto.roleId);        
      } else if (createUserDto.role){
        //check role by role.id
        role = await this.rolesService.findOneById(createUserDto.role.id);
      } else {
        //Role not entered - set default role
        // Get default role 'user'
        role = await this.rolesService.findOneByName(RoleEnum.User);
      }

      if (!role) {
        throw new NotFoundException("User role not found");
      }
      user.role = role;
      Object.assign(user, createUserDto);
      try{
        this.repo.create(user);
        const createdUser=await this.repo.save(user);
        delete createdUser.password;
        return createdUser;
      
      } catch (error){
        if (error instanceof Error){
          throw new BadRequestException(error.message)
        } else {
          throw new BadRequestException("Something went wrong! Try again later.")
        }
      }
    }     
  }

  async findAll() {
     return await this.repo.find();
  }

  async findOneByEmail(email: string) {
    const user = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.refreshToken')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', {email: email})
      .withDeleted()
      .getOne();
    
      console.log('user');
      console.log(user)
      if(!user){
        throw new HttpException(
          `User with email ${email} not found`,
          HttpStatus.NOT_FOUND
        )
      } else {
        return user;
      }
  }

  async setCurrentRefreshToken(id: string, refreshToken: string) {

    const currentUser = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.refreshToken')
      .where('user.id =:id', { id: id })
      .getOne();

    if (currentUser) {
      currentUser.refreshToken = refreshToken;
      await this.repo.save(currentUser);
    } else {
      throw new BadRequestException("User not found");
    }
  }

  async removeCurrentRefreshToken(id: string) {
    return await this.repo.update(id, {
      refreshToken: null
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
