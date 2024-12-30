import { Controller, Get, Param } from '@nestjs/common';
import { CustomerDbService } from './db.service';
import { Customer } from '@prisma/client';

@Controller()
export class AppController {
	constructor(private readonly dbService: CustomerDbService) { }

	@Get()
	async getCustomers(): Promise<Customer[]> {
		return this.dbService.getAll();
	}

	@Get(":id")
	async getCustomer(@Param() param: { id: string }): Promise<Customer | null> {
		return this.dbService.getByID(Number(param.id))
	}
}
