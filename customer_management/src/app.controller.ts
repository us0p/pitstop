import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CustomerDbService } from './db.service';
import { Customer } from '@prisma/client';
import { CustomerDTO } from './customer.dto';
import { KafkaService } from './kafka.service';

@Controller()
export class AppController {
	constructor(
		private readonly dbService: CustomerDbService,
		private readonly kafkaService: KafkaService
	) { }

	@Get()
	async getCustomers(): Promise<Customer[]> {
		return this.dbService.getAll();
	}

	@Get(":id")
	async getCustomer(@Param() param: { id: string }): Promise<Customer | null> {
		return this.dbService.getByID(Number(param.id))
	}

	@Post()
	async createCustomer(@Body() customer: CustomerDTO): Promise<Customer> {
		const c = await this.dbService.create(customer)
		await this.kafkaService.publish({
			action: "CREATE",
			customer: c,
			timestamp: new Date().toISOString()
		})
		return c
	}
}
