import 
{ IsString, 
  IsNotEmpty, 
  MinLength, 
  MaxLength, 
  IsEmail, 
  IsOptional, 
  IsEnum 
} from 'class-validator';

//
export class CreateUserDto {
    @IsString({message: 'Le nom doit être une chaine de caracteres'})
    @IsNotEmpty({message: 'Le nom est requis'})
    @MinLength(3, { message: 'Le nom doit etre au moins sur 3 caracteres'})
    @MaxLength(20, { message: 'Le nom doit etre au plus sur 20 caracteres'})
    name : string;
    @IsEmail({}, {message: 'Le email doit etre une adresse email valide'})
    @IsNotEmpty({message: 'Le email est requis'})
    email: string;
    @IsOptional()
    @IsEnum(['admin', 'user'], {message: 'Le role doit etre admin ou user'})
    role?: 'admin' | 'user';
}