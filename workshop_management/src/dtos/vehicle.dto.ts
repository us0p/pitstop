export class VehicleDTO {
	id: number
	licensenumber: string
	brand: string
	type: string
	ownerid: number

	constructor(id: number, licensenumber: string, brand: string, type: string, ownerid: number) {
		this.id = id
		this.licensenumber = licensenumber
		this.brand = brand
		this.type = type
		this.ownerid = ownerid
	}
}
