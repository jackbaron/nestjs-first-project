import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
    'database',
    (): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: process.env.DB_SYNCHRONIZE === "true", // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data. 
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ]
    }),
);