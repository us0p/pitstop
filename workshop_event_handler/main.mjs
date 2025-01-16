import "dotenv/config";

import { Kafka } from "kafkajs";
import { Database } from "./db.mjs";

import { migrations } from "./migrations.mjs";

const database = new Database();
database.applyMigrations(migrations);

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: process.env.KAFKA_BROKERS.split(","),
});

const consumer = kafka.consumer({ groupId: "event-handler" });

await consumer.connect();
await consumer.subscribe({
  topics: [
    process.env.KAFKA_VEHICLE_TOPIC,
    process.env.KAFKA_CUSTOMER_TOPIC,
    process.env.KAFKA_WORKSHOP_TOPIC,
  ],
  fromBeginning: true,
});

await consumer.run({
  eachMessage: ({ topic, message }) => {
    switch (topic) {
      case process.env.KAFKA_VEHICLE_TOPIC: {
        const { vehicle } = JSON.parse(message.value);

        return database.insertVehicle(
          vehicle.id,
          vehicle.licensenumber,
          vehicle.brand,
          vehicle.type,
          vehicle.ownerid,
        );
      }
      case process.env.KAFKA_CUSTOMER_TOPIC: {
        const { customer } = JSON.parse(message.value);

        return database.insertCustomer(
          customer.id,
          customer.name,
          customer.telephoneNumber,
        );
      }
      case process.env.KAFKA_WORKSHOP_TOPIC: {
        const { event, data } = JSON.parse(message.value);
        switch (event) {
          case "PlanMaintenanceJob": {
            return database.planMaintenance(
              data.starttime,
              data.endtime,
              data.customerid,
              data.vehicleid,
              data.description,
            );
          }
          case "FinishMaintenanceJob": {
            return database.finishMaintenance(
              data.maintenanceid,
              data.actualstarttime,
              data.actualendtime,
              data.notes,
            );
          }
          default: {
            throw Error("Unrecognized command: " + event);
          }
        }
      }
      default: {
        throw Error("Unrecognized topic: " + topic);
      }
    }
  },
});
