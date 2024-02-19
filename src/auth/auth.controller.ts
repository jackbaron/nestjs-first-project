import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService) {
    }

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto) {
        this.authService.signUp(signUpDto);
        return 'sign up';
    }
}
