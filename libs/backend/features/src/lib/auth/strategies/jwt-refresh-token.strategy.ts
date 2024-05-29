import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import parse from 'parse-duration';
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
import { IJwtPayload } from "@mtfs/shared/domain";


@Injectable()
export class JwtRefreshAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-access-token') {

  private readonly logger = new Logger(JwtRefreshAccessTokenStrategy.name)
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        this.logger.debug(`cookie Refresh`);
        this.logger.debug(request?.cookies?.Refresh);
        return request?.cookies?.Refresh;
      }]),
      secretOrKey: `${parse(configService.get('JWT_REFRESH_TOKEN_SECRET') as string)}`,
      ignoreExpiration: false,
      passReqToCallback: true,
    });    
  }

  async validate(request: Request, payload: IJwtPayload) {
    this.logger.debug(`validate`)
    const refreshToken = request.cookies?.Refresh;
    this.logger.debug(`refreshToken - ${refreshToken}`)
    this.logger.debug(`payload.email - ${payload.email}`)
    return await this.authService.verifyRefreshToken(payload.email, refreshToken);
  }
}