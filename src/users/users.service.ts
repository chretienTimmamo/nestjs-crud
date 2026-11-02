import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../types/userType.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';



@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'admin',
        },
         {
            id: 2,
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            role: 'admin',
        },
         {
            id: 3,
            name: 'Jim Doe',
            email: 'jim.doe@example.com',
            role: 'admin',
        },
         {
            id: 4,
            name: 'Jill Doe',
            email: 'jill.doe@example.com',
            role: 'admin',
        },
         {
            id: 5,
            name: 'Jack Doe',
            email: 'jack.doe@example.com',
            role: 'admin',
        },
        {
            id: 10,
            name: 'Timmam',
            email: 'timmam@example.com',
            role: 'expert',
        },

    ];
     
    findAll(): User[]{
        return this.users;
    }
    
    findOne(id: number): User {
        const user = this.users.find((user) => user.id === id) as User;
      if (!user) {
            throw new NotFoundException(`Utilisateur avec id ${id} non trouvé findOne`);
        } 
        return user;
    }
    create(userCreate: CreateUserDto): User {
        const newId = this.users.length + 1;
        const newUser: User = {
            ...userCreate,
            id: newId,
        };
        this.users.push(newUser);
        return newUser;
    }
    update(id: number, updateUser: UpdateUserDto): User {
        const index =  this.users.findIndex((user) => user.id === id);
        if(index === -1) {
            throw new NotFoundException(`Utilisateur avec id ${id} non trouvé`);
        }   
        this.users[index] = { ...updateUser, id};
        return this.users[index];
    }

    delete(id: number): string {
        this.findOne(id);
        this.users = this.users.filter((user) => user.id !== id);
        if(this.users.length === this.users.length){
            throw new NotFoundException(`Utilisateur avec id ${id} non trouvé`);
        }
        return `User with id ${id} has been successfully deleted.`;
    }
}
