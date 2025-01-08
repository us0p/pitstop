import { Injectable } from "@nestjs/common"
import { Kafka } from "kafkajs"

@Injectable()
export class KafkaService {
	private client: Kafka

	constructor() {
		this.client = new Kafka({
			clientId: process.env.KAFKA_CLIENT_ID,
			brokers: process.env.KAFKA_BROKERS.split(" ")
		})
	}

	async publish(event: any) {
		const producer = this.client.producer()
		await producer.connect()
		await producer.send({
			topic: process.env.KAFKA_TOPIC,
			messages: [{ value: JSON.stringify(event) }]
		})
		await producer.disconnect()
	}
}
