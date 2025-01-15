type Command = 'PlanMaintenanceJob' | 'FinishMaintenanceJob'

export class EventModel {
	event: Command
	data: any
	timestamp: Date

	constructor(event: Command, data: any) {
		this.event = event
		this.data = data
		this.timestamp = new Date()
	}

	toJSON(): string {
		return JSON.stringify({ event: this.event, data: this.data, timestamp: this.timestamp })
	}
}
