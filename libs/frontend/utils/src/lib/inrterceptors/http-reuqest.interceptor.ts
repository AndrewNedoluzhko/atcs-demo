import { HttpInterceptorFn } from '@angular/common/http';
import { APISettings } from '../settings/api.settings';

export const httpRequestInterceptor: HttpInterceptorFn = (request, next) => {
  const modifiedRequest = request.clone({
    url: `${APISettings.API_ENDPOINT}${request.url}`,
  });
  const finalRequest = modifiedRequest.clone(APISettings.httpOptions);  
  return next(finalRequest);
};
