import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [DbModule, SampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
