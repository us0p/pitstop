import "dotenv/config";

import { KafkaService } from "./kafka.js";
import { NotifyService } from "./notification.js";

const notificationService = new NotifyService();
notificationService.notify("test", "message");
const kafkaService = new KafkaService(notificationService);

await kafkaService.consumer();
