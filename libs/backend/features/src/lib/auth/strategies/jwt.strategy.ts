import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
import { IJwtPayload } from "@mtfs/shared/domain";
import parse = require("parse-duration");


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name)
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        this.logger.debug(`cookie Authentication`);
        this.logger.debug(request?.cookies?.Authentication);
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: `${parse(configService.get('JWT_ACCESS_TOKEN_SECRET') as string)}`,      
      ignoreExpiration: false,
      passReqToCallback: false,
    });    
  }

  async validate(payload: IJwtPayload) {
    this.logger.debug(`validate`)
    return await this.authService.verify(payload.email);
  }
}