import { VehicleDatabaseService } from './app.service';
import { Vehicle } from '@prisma/client';
import { VehicleDTO } from "./vehicle.dto";
export declare class AppController {
    private readonly vehicleDatabaseService;
    constructor(vehicleDatabaseService: VehicleDatabaseService);
    listVehicles(): Promise<Vehicle[]>;
    createVehicle(body: VehicleDTO): Promise<Vehicle>;
}
