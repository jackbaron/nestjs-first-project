import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private userRepository : UserRepository
    ) {

    }

    async signUp(signUpDto: SignUpDto) : Promise<void> {
        return this.userRepository.signUp(signUpDto)
    }
}
