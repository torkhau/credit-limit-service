import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.getTokenFromHeader(request);

    if (token && this.validateToken(token)) {
      request.user = token.slice(0, -4);
      return true;
    }

    throw new UnauthorizedException('Invalid or missing token');
  }

  private getTokenFromHeader(request: RequestWithUser): string | null {
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer '))
      return authHeader.split(' ')[1];

    return null;
  }

  private validateToken(token: string): boolean {
    return token.length > 4 && token.endsWith('-tkn');
  }
}
