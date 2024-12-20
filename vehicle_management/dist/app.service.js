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
exports.VehicleDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const kafka_service_1 = require("./kafka.service");
let VehicleDatabaseService = class VehicleDatabaseService {
    constructor(vehicleKafkaService) {
        this.vehicleKafkaService = vehicleKafkaService;
        if (this.instance)
            return this.instance;
        this.dbClient = new client_1.PrismaClient({
            log: [{ emit: "event", level: "query" }]
        });
        this.dbClient.$on("query", async (e) => {
            if (e.query.startsWith('INSERT INTO "public"."VehicleMessageOutbox"')) {
                const vehicles = await this.dbClient.vehicleMessageOutbox.findMany({
                    where: { delivered: false },
                    select: {
                        id: true,
                        action: true,
                        vehicledata: true
                    }
                });
                const ids = [];
                const asdf = [];
                for (let i = 0; i < vehicles.length; i++) {
                    const v = vehicles[i];
                    ids.push(v.id);
                    asdf.push({ action: v.action, vehicle: v.vehicledata });
                }
                this.vehicleKafkaService.publish(asdf);
                await this.dbClient.vehicleMessageOutbox.updateMany({
                    where: {
                        id: { in: ids }
                    },
                    data: {
                        delivered: true
                    }
                });
            }
        });
        this.instance = this;
    }
    async getMany() {
        return await this.dbClient.vehicle.findMany();
    }
    async create(vehicle) {
        const [vehicleData] = await this.dbClient.$transaction([
            this.dbClient.vehicle.create({ data: vehicle }),
            this.dbClient.vehicleMessageOutbox.create({
                data: {
                    action: "CREATE",
                    vehicledata: JSON.stringify(vehicle)
                }
            })
        ]);
        return vehicleData;
    }
};
exports.VehicleDatabaseService = VehicleDatabaseService;
exports.VehicleDatabaseService = VehicleDatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kafka_service_1.VehicleKafkaService])
], VehicleDatabaseService);
//# sourceMappingURL=app.service.js.map