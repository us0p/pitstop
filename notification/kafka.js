import { Kafka } from "kafkajs";

export class KafkaService {
  #client = undefined;
  #instance = null;
  #notifier = null;

  constructor(notifier) {
    if (this.#instance) return this.#instance;
    this.#instance = this;
    this.#client = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: process.env.KAFKA_BROKERS.split(","),
    });
    this.#notifier = notifier;
  }

  async consumer() {
    const consumer = this.#client.consumer({
      groupId: process.env.KAFKA_GROUP_ID,
    });
    await consumer.connect();
    await consumer.subscribe({ topic: process.env.KAFKA_WORKSHOP_TOPIC });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const { event, data } = JSON.parse(message.value);
        switch (event) {
          case "PlanMaintenanceJob": {
            return this.#notifier.notify(
              event,
              `Maintenance planned for ${new Date(data.starttime).toLocaleDateString()}`,
            );
          }
          case "FinishMaintenanceJob": {
            return this.#notifier.notify(
              event,
              `Finished maintenance ID ${data.maintenanceid}`,
            );
          }
          default: {
            throw Error("Unrecognized event: " + event);
          }
        }
      },
    });
  }
}
