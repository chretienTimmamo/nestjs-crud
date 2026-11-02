
import { 
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException 
} from '@nestjs/common';
import {Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Unauthorized');
        }
        if( token !== '1234567890') {
            throw  new UnauthorizedException('Unauthorized');
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}