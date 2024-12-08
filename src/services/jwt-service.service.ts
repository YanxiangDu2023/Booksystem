import {injectable} from '@loopback/core';
import {JwtPayload, verify, sign} from 'jsonwebtoken';

export class JWTService {
  private readonly jwtSecret = 'your-secret-key';
  private readonly jwtExpiresIn = '1h';

  generateToken(payload: object): string {
    return sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });
  }

  verifyToken(token: string): string | JwtPayload {
    try {
      return verify(token, this.jwtSecret);
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
