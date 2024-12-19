import { Vehicle } from "@prisma/client";
import { VehicleDTO } from './vehicle.dto';
export declare class VehicleDatabaseService {
    private dbClient?;
    private instance?;
    constructor();
    getMany(): Promise<Vehicle[]>;
    create(vehicle: VehicleDTO): Promise<Vehicle>;
}
