import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"
import { IsUnique } from "src/shared/validation/is-unique";
import { User } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    fullName : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @IsStrongPassword()
    password : string

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    @IsEmail()
    @IsUnique({entity: User, column: 'email', })
    email: string
}