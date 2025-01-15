import { Kafka, RecordMetadata } from "kafkajs";

export class KafkaService {
	client: Kafka

	constructor() {
		this.client = new Kafka({
			clientId: process.env.KAFKA_CLIENT_ID,
			brokers: process.env.KAFKA_BROKERS.split(',')
		})
	}

	async publish(event: string): Promise<RecordMetadata[]> {
		const producer = this.client.producer()
		await producer.connect()
		const record = await producer.send({
			topic: process.env.KAFKA_TOPIC,
			messages: [
				{ value: event }
			]
		})
		await producer.disconnect()
		return record
	}
}
