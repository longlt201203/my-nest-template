import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasource } from './datasource';

@Module({
    imports: [TypeOrmModule.forRoot(datasource.options)]
})
export class DbModule {}
