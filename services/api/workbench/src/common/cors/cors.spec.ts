import { checkAllowedOrigin } from './cors';

describe('checkAllowedOrigin Function Tests', () => {
  // Tests for allowed origins
  test('should allow staging API origin', () => {
    expect(checkAllowedOrigin('https://staging.upwage.net')).toBe(true);
  });

  test('should allow production API origin', () => {
    expect(checkAllowedOrigin('https://api.upwage.com')).toBe(true);
  });

  // Tests for origins with wildcards
  test('should allow any subdomain for wagemap-test.vercel.app', () => {
    expect(checkAllowedOrigin('https://anything-wagemap-test.vercel.app')).toBe(
      true,
    );
  });

  test('should allow screener-frontend with any subdomain for wagemap-test', () => {
    expect(
      checkAllowedOrigin(
        'https://screener-frontend-xyz-wagemap-test.vercel.app',
      ),
    ).toBe(true);
  });

  // Tests for disallowed origins
  test('should not allow random origin', () => {
    expect(checkAllowedOrigin('https://randomsite.com')).toBe(false);
  });

  test('should not allow a subdomain of an allowed origin', () => {
    expect(checkAllowedOrigin('https://sub.api.upwage.com')).toBe(false);
  });

  test("ryan's local dev should be allowed through http", () => {
    expect(checkAllowedOrigin('http://192.168.50.35')).toBe(true);
  });

  test("ryan's local dev should be allowed through https", () => {
    expect(checkAllowedOrigin('https://192.168.50.35')).toBe(true);
  });
});
