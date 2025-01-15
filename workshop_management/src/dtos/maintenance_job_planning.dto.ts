export class MaintenanceJobPlanningDTO {
	starttime: string
	endtime: string
	customerid: number
	vehicleid: number
	description: string

	constructor(starttime: string, endtime: string, customerid: number, vehicleid: number, description: string) {
		this.starttime = starttime
		this.endtime = endtime
		this.customerid = customerid
		this.vehicleid = vehicleid
		this.description = description
	}
}
