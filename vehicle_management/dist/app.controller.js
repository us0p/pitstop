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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("./db.service");
const vehicle_dto_1 = require("./vehicle.dto");
const kafka_service_1 = require("./kafka.service");
let AppController = class AppController {
    constructor(vehicleDatabaseService, vehicleKafkaService) {
        this.vehicleDatabaseService = vehicleDatabaseService;
        this.vehicleKafkaService = vehicleKafkaService;
    }
    async listVehicles() {
        return await this.vehicleDatabaseService.getMany();
    }
    async getVehicle(params) {
        return await this.vehicleDatabaseService.getByID(Number(params.id));
    }
    async createVehicle(body) {
        const vehicle = await this.vehicleDatabaseService.create(body);
        await this.vehicleKafkaService.publish({ action: "VehicleCreated", vehicle });
        return vehicle;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "listVehicles", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getVehicle", null);
__decorate([
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_dto_1.VehicleDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createVehicle", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [db_service_1.VehicleDatabaseService,
        kafka_service_1.VehicleKafkaService])
], AppController);
//# sourceMappingURL=app.controller.js.map