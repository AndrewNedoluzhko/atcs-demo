import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../users/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ){}

  async register(createAuthDto: CreateAuthDto) {
    return await this.usersService.create(createAuthDto);
  }

  signToken(user: User, options: any) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload, options);
  }

  async setCurrentRefreshToken(id: string, refreshToken: string) {
    await this.usersService.setCurrentRefreshToken(id, refreshToken);
  }

  async login(email: string, password: string) {
    //this.logger.debug(`login`);
    const user = await this.usersService.findOneByEmail(email);
    if (await user.veryfyPassword(password)) {
      delete user.password;
      delete user.refreshToken;
      //this.logger.debug(`login.success`);
      return user;
    } else {
      throw new UnauthorizedException('Password missmatched')
    }
  }

  async verifyRefreshToken(email: string, refreshToken: string): Promise<User> {
    if (!email) {
      throw new UnauthorizedException();
    }
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token expired!");
    }
    const user = await this.usersService.findOneByEmail(email);
    if (await user.verifyRefreshToken(refreshToken)) {
      delete user.password;
      delete user.refreshToken;
      return user;
    } else {
      throw new UnauthorizedException('Refresh Token mismatched')
    }
  }

  async verify(email: string): Promise<User> {
    if (!email) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    delete user.password;
    delete user.refreshToken;
    return user;
  }



  async removeCurrentRefreshToken(id: string) {
    await this.usersService.removeCurrentRefreshToken(id);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }


  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
