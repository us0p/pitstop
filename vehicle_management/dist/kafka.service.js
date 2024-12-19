"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleKafkaService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
let VehicleKafkaService = class VehicleKafkaService {
    constructor() {
        if (this.instance)
            return this.instance;
        this.kafkaClient = new kafkajs_1.Kafka({
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: (process.env.KAFKA_BROKERS || "").split(",")
        });
        return this;
    }
    async publish(event) {
        const producer = this.kafkaClient.producer();
        await producer.connect();
        const recordMetadata = await producer.send({
            topic: process.env.KAFKA_TOPIC,
            messages: [{ value: JSON.stringify(event) }]
        });
        await producer.disconnect();
        return recordMetadata;
    }
};
exports.VehicleKafkaService = VehicleKafkaService;
exports.VehicleKafkaService = VehicleKafkaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], VehicleKafkaService);
//# sourceMappingURL=kafka.service.js.map