import { Injectable } from "@nestjs/common"
import { Kafka, RecordMetadata } from "kafkajs"

@Injectable()
export class VehicleKafkaService {
	private instance?: VehicleKafkaService
	private kafkaClient: Kafka

	constructor() {
		if (this.instance) return this.instance
		this.kafkaClient = new Kafka({
			clientId: process.env.KAFKA_CLIENT_ID,
			// an array of strings in the format of host:port
			brokers: (process.env.KAFKA_BROKERS || "").split(",")
		})
		return this
	}

	async publish(events: any[]): Promise<RecordMetadata[]> {
		const producer = this.kafkaClient.producer()
		await producer.connect()
		const recordMetadata = await producer.send({
			topic: process.env.KAFKA_TOPIC,
			messages: events.map(e => ({ value: JSON.stringify(e) }))
		})
		await producer.disconnect()
		return recordMetadata
	}
}
