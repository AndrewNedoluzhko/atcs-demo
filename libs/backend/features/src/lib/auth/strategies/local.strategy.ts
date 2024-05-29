import { Strategy } from "passport-local";
import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { AuthService } from "../auth.service";
import { User } from '../../users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name)
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  validate(email: string, password: string): Promise<User> {   
    return this.authService.login(email, password);
  }
}