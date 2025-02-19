import { BearerStrategy } from './bearer.strategy';
import { UnauthorizedException } from '@nestjs/common';

describe('BearerStrategy', () => {
  let bearerStrategy: BearerStrategy;
  const originalEnv = process.env;

  beforeEach(() => {
    // Setup a fresh instance of the strategy before each test
    bearerStrategy = new BearerStrategy();
    // Mock the environment variables
    process.env = {
      ...originalEnv,
      SCREENER_SHARED_SECRET_TOKEN: 'test_secret',
    };
  });

  afterEach(() => {
    // Restore environment variables after each test
    process.env = originalEnv;
  });

  it('should validate a correct token', async () => {
    const token = 'test_secret';
    await expect(bearerStrategy.validate(token)).resolves.toEqual({ token });
  });

  it('should throw UnauthorizedException for an incorrect token', async () => {
    const token = 'incorrect_token';
    await expect(bearerStrategy.validate(token)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
