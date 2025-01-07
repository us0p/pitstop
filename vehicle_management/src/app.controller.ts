import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VehicleDatabaseService } from './db.service';
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

	@Get(":id")
	async getVehicle(@Param() params: { id: string }): Promise<Vehicle> {
		return await this.vehicleDatabaseService.getByID(Number(params.id))
	}

	@Post("/create")
	async createVehicle(@Body() body: VehicleDTO): Promise<Vehicle> {
		const vehicle = await this.vehicleDatabaseService.create(body)
		await this.vehicleKafkaService.publish({ action: "VehicleCreated", vehicle })
		return vehicle;
	}
}
