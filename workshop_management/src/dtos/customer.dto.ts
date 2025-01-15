export class CustomerDTO {
	id: number
	name: string
	telephoneNumber: string

	constructor(id: number, name: string, telephoneNumber: string) {
		this.id = id
		this.name = name
		this.telephoneNumber = telephoneNumber
	}
}
