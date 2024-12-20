import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Vehicle } from "@prisma/client"
import { VehicleDTO } from './vehicle.dto';
import { VehicleKafkaService } from './kafka.service';

@Injectable()
export class VehicleDatabaseService {
	// https://github.com/prisma/prisma/issues/11986
	private dbClient?: PrismaClient<Prisma.PrismaClientOptions, "query">
	private instance?: VehicleDatabaseService

	constructor(private readonly vehicleKafkaService: VehicleKafkaService) {
		if (this.instance) return this.instance;
		this.dbClient = new PrismaClient({
			log: [{ emit: "event", level: "query" }]
		});
		// event is being executed in the middle of the transaction
		// updates all previous unpublished transactions but the current isn't published
		// it stringfies the vehicle data two times
		this.dbClient.$on("query", async (e) => {
			if (e.query.startsWith('INSERT INTO "public"."VehicleMessageOutbox"')) {
				const vehicles = await this.dbClient.vehicleMessageOutbox.findMany({
					where: { delivered: false },
					select: {
						id: true,
						action: true,
						vehicledata: true
					}
				})
				const ids: number[] = []
				const asdf = []
				for (let i = 0; i < vehicles.length; i++) {
					const v = vehicles[i]
					ids.push(v.id)
					asdf.push({ action: v.action, vehicle: v.vehicledata })
				}
				this.vehicleKafkaService.publish(asdf)
				await this.dbClient.vehicleMessageOutbox.updateMany({
					where: {
						id: { in: ids }
					},
					data: {
						delivered: true
					}
				})
			}
		})
		this.instance = this
	}

	async getMany(): Promise<Vehicle[]> {
		return await this.dbClient.vehicle.findMany()
	}

	async create(vehicle: VehicleDTO): Promise<Vehicle> {
		const [vehicleData] = await this.dbClient.$transaction([
			this.dbClient.vehicle.create({ data: vehicle }),
			this.dbClient.vehicleMessageOutbox.create({
				data: {
					action: "CREATE",
					vehicledata: JSON.stringify(vehicle)
				}
			})
		])
		return vehicleData
	}
}
