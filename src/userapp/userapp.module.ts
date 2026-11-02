import { Module } from '@nestjs/common';
import { UserappService } from './userapp.service.js';
import { UserappController } from './userapp.controller.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports:[DatabaseModule],
  controllers: [UserappController],
  providers: [UserappService],
})
export class UserappModule {}
