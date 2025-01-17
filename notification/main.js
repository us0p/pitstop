import "dotenv/config";

import { KafkaService } from "./kafka.js";
import { NotifyService } from "./notification.js";

const notificationService = new NotifyService();
const kafkaService = new KafkaService(notificationService);

await kafkaService.consumer();
