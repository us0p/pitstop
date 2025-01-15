import { CustomerDTO } from "./dtos/customer.dto"
import { VehicleDTO } from "./dtos/vehicle.dto"

const sqlite = require("node:sqlite")

export class DatabaseService {
	db: any

	constructor() {
		this.db = new sqlite.DatabaseSync(`${process.cwd()}/db/db.sqlite`)
	}

	getCustomers() {
		const customers = this.db.prepare('SELECT * FROM customer;').all()

		return customers.map(customer => new CustomerDTO(customer.id, customer.name, customer.telephoneNumber))
	}

	getVehicles() {
		const vehicles = this.db.prepare('SELECT * FROM vehicle;').all()
		return vehicles.map(vehicle => new VehicleDTO(vehicle.id, vehicle.licensenumber, vehicle.brand, vehicle.type, vehicle.ownerid))
	}

	getCustomer(id: number): CustomerDTO | null {
		const query = this.db.prepare('SELECT * FROM customer WHERE id = ?;')
		const customer = query.get(id)
		if (!customer) return null;
		return new CustomerDTO(customer.id, customer.name, customer.telephoneNumber)
	}

	getVehicle(id: number): VehicleDTO | null {
		const query = this.db.prepare('SELECT * FROM vehicle WHERE id = ?;')
		const vehicle = query.get(id)
		if (!vehicle) return null;
		return new VehicleDTO(vehicle.id, vehicle.licensenumber, vehicle.brand, vehicle.type, vehicle.ownerid)
	}
}
