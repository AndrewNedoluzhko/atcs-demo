import { JwtRefreshAccessTokenGuard } from './jwt-refresh-access-token.guard';

describe('JwtRefreshAccessTokenGuard', () => {
  it('should be defined', () => {
    expect(new JwtRefreshAccessTokenGuard()).toBeDefined();
  });
});
