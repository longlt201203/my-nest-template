import { Module } from "@nestjs/common";
import { SampleModule } from "@modules/sample";
import { DbModule } from "@db";

@Module({
	imports: [DbModule, SampleModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
