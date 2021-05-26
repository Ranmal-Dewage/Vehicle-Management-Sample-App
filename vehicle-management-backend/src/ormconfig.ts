import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions =
{
    "type": "postgres",
    "host": "127.0.0.1",
    "port": 5432,
    "username": "postgres",
    "password": "c6h12o67c2h5oh",
    "database": "vehicle_db",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
};