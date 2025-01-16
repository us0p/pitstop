export class MaintenanceDTO {
	id: number
	starttime: Date
	endtime: Date
	vehicleid: number
	customerid: number
	description: string
	actualstarttime: Date
	actualendtime: Date
	notes: string
	workshopplanningdate: Date

	constructor(
		id: number,
		starttime: Date,
		endtime: Date,
		vehicleid: number,
		customerid: number,
		description: string,
		actualstarttime: Date,
		actualendtime: Date,
		notes: string,
		workshopplanningdate: Date
	) {
		this.id = id
		this.starttime = starttime
		this.endtime = endtime
		this.vehicleid = vehicleid
		this.customerid = customerid
		this.description = description
		this.actualstarttime = actualstarttime
		this.actualendtime = actualendtime
		this.notes = notes
		this.workshopplanningdate = workshopplanningdate
	}
}
