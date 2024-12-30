import { Injectable } from '@nestjs/common';
import { Customer, PrismaClient } from '@prisma/client';
import { CustomerDTO } from './customer.dto';

@Injectable()
export class CustomerDbService {
	private client: PrismaClient;
	private instance?: CustomerDbService

	constructor() {
		if (this.instance) return this.instance
		this.client = new PrismaClient();
		this.instance = this
	}

	async getByID(id: number): Promise<Customer | null> {
		return this.client.customer.findUnique({ where: { id } })
	}

	async getAll(): Promise<Customer[]> {
		return this.client.customer.findMany()
	}

	async create(customer: CustomerDTO): Promise<Customer> {
		return this.client.customer.create({ data: customer })
	}
}
