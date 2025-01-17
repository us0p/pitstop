import { Injectable } from "@nestjs/common"
import { Collection, Document, MongoClient } from "mongodb"

@Injectable()
export class EventSourcingService {
	eventStore: Collection<Document>

	constructor() {
		const client = new MongoClient(process.env.MONGO_URL || "")
		const database = client.db('events')
		this.eventStore = database.collection('eventStore')
	}
}
