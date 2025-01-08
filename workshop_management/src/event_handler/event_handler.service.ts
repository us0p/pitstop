import { Injectable } from "@nestjs/common";
import { EachMessageHandler, Kafka } from "kafkajs";

@Injectable()
export class KafkaConsumerService {
	private client: Kafka

	constructor() {
		this.client = new Kafka({
			clientId: process.env.KAFKA_CLIENT_ID,
			brokers: process.env.KAFKA_BROKERS.split(" ")
		})
	}

	async createConsumer(
		topic: string,
		consumerCB: EachMessageHandler
	) {
		const consumer = this.client.consumer({ groupId: "workshop-group" })

		await consumer.connect()
		await consumer.subscribe({ topic, fromBeginning: true })

		await consumer.run({
			eachMessage: consumerCB
		})
	}
}
