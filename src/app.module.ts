import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dirname } from 'path';
import databaseConfig from './config/database.config'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
            load: [databaseConfig]
        }),
        TypeOrmModule.forRoot(databaseConfig()),
        AuthModule,
        UserModule
    ],
    controllers: [],
    providers: [],
})

export class AppModule {
   constructor(private configService: ConfigService) {
    // console.log(this.configService.get('database'));
   }
}
