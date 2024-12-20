import { Controller, Get, Post, Body } from '@nestjs/common';
import { VehicleDatabaseService } from './app.service';
import { Vehicle } from '@prisma/client';
import { VehicleDTO } from "./vehicle.dto"

@Controller()
export class AppController {
	constructor(
		private readonly vehicleDatabaseService: VehicleDatabaseService,
	) { }

	@Get()
	async listVehicles(): Promise<Vehicle[]> {
		return await this.vehicleDatabaseService.getMany();
	}

	@Post("/create")
	async createVehicle(@Body() body: VehicleDTO): Promise<Vehicle> {
		const vehicle = await this.vehicleDatabaseService.create(body)
		return vehicle;
	}
}
