import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { VehicleDatabaseService } from './db.service';
import { VehicleKafkaService } from './kafka.service';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [VehicleDatabaseService, VehicleKafkaService],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello World!');
		});
	});
});
