import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerDbService } from './db.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [CustomerDbService],
})
export class AppModule { }
