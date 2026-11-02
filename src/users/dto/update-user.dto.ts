
import { CreateUserDto} from './create-user.dto.js';
import { PartialType } from '@nestjs/mapped-types';

// eslint-disable-next-line
export class UpdateUserDto extends PartialType(CreateUserDto){

}