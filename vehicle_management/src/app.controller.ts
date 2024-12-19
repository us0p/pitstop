import { Controller, Get, Post, Body } from '@nestjs/common';
import { VehicleDatabaseService } from './app.service';
import { Vehicle } from '@prisma/client';
import { VehicleDTO } from "./vehicle.dto"
import { VehicleKafkaService } from './kafka.service';

@Controller()
export class AppController {
	constructor(
		private readonly vehicleDatabaseService: VehicleDatabaseService,
		private readonly vehicleKafkaService: VehicleKafkaService
	) { }

	@Get()
	async listVehicles(): Promise<Vehicle[]> {
		return await this.vehicleDatabaseService.getMany();
	}

	@Post("/create")
	async createVehicle(@Body() body: VehicleDTO): Promise<Vehicle> {
		const vehicle = await this.vehicleDatabaseService.create(body)
		await this.vehicleKafkaService.publish({ action: "CREATE", vehicle })
		return vehicle;
	}
}
