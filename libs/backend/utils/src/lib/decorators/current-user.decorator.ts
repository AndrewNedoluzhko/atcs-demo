import { ExecutionContext,  Logger,  createParamDecorator } from "@nestjs/common"


export const CurrentUser = createParamDecorator(
  
  (data: unknown, ctx: ExecutionContext) =>{
    const logger = new Logger('CurrentUser Decorator')
    logger.debug(`CurrentUser Decorator`);
    const request= ctx.switchToHttp().getRequest();  
    logger.debug(request.user);  
    return request.user|| null;
  },
);