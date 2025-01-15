import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseService } from "./db.service"
import { ConfigModule } from "@nestjs/config"
import { KafkaService } from './kafka.service';
import { EventSourcingService } from './event_sourcing.service';

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [AppController],
	providers: [DatabaseService, KafkaService, EventSourcingService],
})
export class AppModule { }
