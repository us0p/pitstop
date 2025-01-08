import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerDbService } from './db.service';
import { KafkaService } from './kafka.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [CustomerDbService, KafkaService],
})
export class AppModule { }
