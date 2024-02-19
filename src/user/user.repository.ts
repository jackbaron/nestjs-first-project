import {  DataSource, Repository } from "typeorm";
import { SignUpDto } from "src/auth/dto/sign-up.dto";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User> {
    
    async signUp(signUpDto: SignUpDto) : Promise<void> {
        const { password, email } = signUpDto;

        const salt = await bcrypt.genSalt()

        const user = new User()

        user.password = await this._hasPassword(password, salt);

        user.email = email;

        user.fullName = signUpDto.fullName
        
        user.salt = salt;

        await user.save();
    }

    private async _hasPassword(password: string, salt: string) : Promise<string> {
        return bcrypt.hash(password, salt);
    }
}