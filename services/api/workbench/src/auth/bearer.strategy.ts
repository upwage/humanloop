import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(token: string): Promise<any> {
    const secretToken = process.env.SCREENER_SHARED_SECRET_TOKEN;
    if (token !== secretToken) {
      throw new UnauthorizedException();
    }
    return { token };
  }
}
