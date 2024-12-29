import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VehicleDatabaseService } from './db.service';
import { VehicleKafkaService } from './kafka.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [VehicleDatabaseService, VehicleKafkaService],
})
export class AppModule { }
