import { Controller, Get, Post, Body } from '@nestjs/common';
import { DatabaseService } from './db.service';
import { CustomerDTO } from './dtos/customer.dto';
import { VehicleDTO } from './dtos/vehicle.dto';
import { MaintenanceJobPlanningDTO } from './dtos/maintenance_job_planning.dto';
import { EventModel } from './model/event_sourcing_model.model';
import { KafkaService } from './kafka.service';
import { EventSourcingService } from './event_sourcing.service';

@Controller()
export class AppController {
	constructor(
		private readonly dbService: DatabaseService,
		private readonly kafkaService: KafkaService,
		private readonly eventStoreService: EventSourcingService
	) { }

	@Get('/customers')
	getCustomers(): CustomerDTO[] {
		return this.dbService.getCustomers()
	}

	@Get('/vehicles')
	getVehicles(): VehicleDTO[] {
		return this.dbService.getVehicles()
	}

	@Post('/plan-maintenance')
	async planMaintenance(@Body() body: MaintenanceJobPlanningDTO): Promise<EventModel> {
		if (!body.customerid) return { error: "customerid is required" }
		const command = new EventModel("PlanMaintenanceJob", body)
		await this.eventStoreService.eventStore.insertOne(command)
		await this.kafkaService.publish(command.toJSON())
		return command
	}
}
