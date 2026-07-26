import { Request } from 'express';

export interface RequestWithUser extends Request {
  userId?: string;
}

export interface AuthenticationRequest extends RequestWithUser {
  userId: string;
}
