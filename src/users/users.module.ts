import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
