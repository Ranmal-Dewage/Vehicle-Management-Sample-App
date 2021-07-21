import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions =
{
    "type": "postgres",
    "host": "127.0.0.1",
    "port": 5432,
    "username": "<your username>",
    "password": "<your password>",
    "database": "vehicle_db",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
};