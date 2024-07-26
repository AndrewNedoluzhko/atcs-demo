import { LogoutGuard } from './logout.guard';

describe('LogoutGuard', () => {
  it('should be defined', () => {
    expect(new LogoutGuard()).toBeDefined();
  });
});
