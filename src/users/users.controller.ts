import {
     Controller,
     Get,
     HttpCode,
     Post, 
     Patch, 
     Param, 
     Body,
     Delete,
     Query,
     ParseIntPipe,
     UseGuards,
    } from '@nestjs/common';

import { UsersService } from './users.service.js';
import type { User } from '../types/userType.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { AuthGuard } from '../common/guards/auth.guards.js';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService) {}

    @UseGuards(AuthGuard)
    @Get()
    @HttpCode(200)
    findAll(): User[]{
        return this.usersService.findAll();
    }

    //@UseGuards(AuthGuard)
    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id', ParseIntPipe) id : number): User {
        return this.usersService.findOne(id);
    }

    @Post()
    @HttpCode(201)
    create(@Body() userCreate : CreateUserDto): User {
        return this.usersService.create(userCreate);

    }

    @Get()
    @HttpCode(200)
    findAllWithQuery(
        @Query('page') page: string, 
        @Query('limit') limit: string,
    ): string {
        return `This action returns all users (page: ${page}, limit: ${limit})`;
    }

    @Patch(':id')
    @HttpCode(200)
    update(@Param('id', ParseIntPipe) id: number,
           @Body() updateUser : UpdateUserDto
        ): User {
        return this.usersService.update(id, updateUser);
    }

    @Delete(':id')
    @HttpCode(200)
    delete(@Param('id', ParseIntPipe) id : number) : string {
        return this.usersService.delete(id);
    }
    
}
