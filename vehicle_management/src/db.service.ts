import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Vehicle } from "@prisma/client"
import { VehicleDTO } from './vehicle.dto';

@Injectable()
export class VehicleDatabaseService {
	// https://github.com/prisma/prisma/issues/11986
	private dbClient?: PrismaClient<Prisma.PrismaClientOptions, "query">
	private instance?: VehicleDatabaseService

	constructor() {
		if (this.instance) return this.instance;
		this.dbClient = new PrismaClient();
		this.instance = this
	}

	async getMany(): Promise<Vehicle[]> {
		return this.dbClient.vehicle.findMany()
	}

	async getByID(id: number): Promise<Vehicle> {
		return this.dbClient.vehicle.findUnique({ where: { id } })
	}

	async create(vehicle: VehicleDTO): Promise<Vehicle> {
		return this.dbClient.vehicle.create({ data: vehicle })
	}
}
