import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from '@utils';

@Module({
    imports: [TypeOrmModule.forRoot({
        // type: ""
        host: Env.DB_HOST,
        port: Env.DB_PORT,
        database: Env.DB_NAME,
        username: Env.DB_USER,
        password: Env.DB_PASS
    })]
})
export class DbModule {}
