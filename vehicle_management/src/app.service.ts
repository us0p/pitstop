import { Injectable } from '@nestjs/common';
import { PrismaClient, Vehicle } from "@prisma/client"
import { VehicleDTO } from './vehicle.dto';

@Injectable()
export class VehicleDatabaseService {
	private dbClient?: PrismaClient
	private instance?: VehicleDatabaseService

	constructor() {
		if (this.instance) return this.instance;
		this.dbClient = new PrismaClient();
		this.instance = this
	}

	async getMany(): Promise<Vehicle[]> {
		return await this.dbClient.vehicle.findMany()
	}

	async create(vehicle: VehicleDTO): Promise<Vehicle> {
		return await this.dbClient.vehicle.create({
			data: vehicle
		})
	}
}
