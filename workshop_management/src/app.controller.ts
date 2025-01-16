import { Controller, Get, Post, Body } from '@nestjs/common';
import { DatabaseService } from './db.service';
import { CustomerDTO } from './dtos/customer.dto';
import { VehicleDTO } from './dtos/vehicle.dto';
import { MaintenanceJobPlanningDTO } from './dtos/maintenance_job_planning.dto';
import { EventModel } from './model/event_sourcing_model.model';
import { KafkaService } from './kafka.service';
import { EventSourcingService } from './event_sourcing.service';
import { MaintenanceJobFinishDTO } from './dtos/maintenance_job_finish.dto';
import { MaintenanceDTO } from './dtos/maintenance.dto';

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

	@Get('/plannings')
	getPlanning(): MaintenanceDTO[] {
		return this.dbService.getPlannings()
	}

	@Post('/plan-maintenance')
	async planMaintenance(@Body() body: MaintenanceJobPlanningDTO): Promise<EventModel | any> {
		if (!body.customerid) return { error: "customerid is required" }
		if (!body.vehicleid) return { error: "vehicleid is required" }
		const customer = this.dbService.getCustomer(body.customerid)
		if (!customer) return { error: `customerid ${body.customerid} doesn't exist` }
		const vehicle = this.dbService.getVehicle(body.vehicleid)
		if (!vehicle) return { error: `vehicleid ${body.vehicleid} doesn't exist` }
		const command = new EventModel("PlanMaintenanceJob", body)
		await this.eventStoreService.eventStore.insertOne(command)
		await this.kafkaService.publish(command.toJSON())
		return command
	}

	@Post('/finish-maintenance')
	async finishMaintenance(@Body() body: MaintenanceJobFinishDTO): Promise<EventModel | any> {
		if (!body.maintenanceid) return { error: 'maintenanceid is required' }
		const planning = this.dbService.getPlanning(body.maintenanceid)
		if (!planning) return { error: `maintenanceid ${body.maintenanceid} doesn't exist` }
		const command = new EventModel("FinishMaintenanceJob", body)
		await this.eventStoreService.eventStore.insertOne(command)
		await this.kafkaService.publish(command.toJSON())
		return command
	}
}
