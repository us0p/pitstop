import { VehicleDatabaseService } from './db.service';
import { Vehicle } from '@prisma/client';
import { VehicleDTO } from "./vehicle.dto";
import { VehicleKafkaService } from './kafka.service';
export declare class AppController {
    private readonly vehicleDatabaseService;
    private readonly vehicleKafkaService;
    constructor(vehicleDatabaseService: VehicleDatabaseService, vehicleKafkaService: VehicleKafkaService);
    listVehicles(): Promise<Vehicle[]>;
    getVehicle(params: {
        id: string;
    }): Promise<Vehicle>;
    createVehicle(body: VehicleDTO): Promise<Vehicle>;
}
