export class MaintenanceJobFinishDTO {
	maintenanceid: number
	actualstarttime: string
	actualendtime: string
	notes: string

	constructor(maintenanceid: number, actualstarttime: string, actualendtime: string, notes: string) {
		this.maintenanceid = maintenanceid
		this.actualstarttime = actualstarttime
		this.actualendtime = actualendtime
		this.notes = notes
	}
}
