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
			brokers: (process.env.KAFKA_BROKERS || "").split(",")
		})
		return this
	}

	async publish(event: any): Promise<RecordMetadata[]> {
		const producer = this.kafkaClient.producer()
		await producer.connect()
		const recordMetadata = await producer.send({
			topic: process.env.KAFKA_TOPIC,
			messages: [{ value: JSON.stringify(event) }]
		})
		await producer.disconnect()
		return recordMetadata
	}
}
