import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { datasource } from "./datasource";
import { addTransactionalDataSource } from "typeorm-transactional";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			dataSourceFactory: async () => addTransactionalDataSource(datasource),
		}),
	],
})
export class DbModule {}
