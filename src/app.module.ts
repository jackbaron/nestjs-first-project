import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dirname } from 'path';
import databaseConfig from './config/database.config'
import { IsUniqueConstraint } from './shared/validation/is-unique';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.development.env`, //TODO
            isGlobal: true,
            load: [databaseConfig]
        }),
        TypeOrmModule.forRoot(databaseConfig()),
        AuthModule,
        UserModule,

    ],
    providers : [IsUniqueConstraint]
})

export class AppModule {
}
