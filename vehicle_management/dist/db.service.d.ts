import { Vehicle } from "@prisma/client";
import { VehicleDTO } from './vehicle.dto';
export declare class VehicleDatabaseService {
    private dbClient?;
    private instance?;
    constructor();
    getMany(): Promise<Vehicle[]>;
    getByID(id: number): Promise<Vehicle>;
    create(vehicle: VehicleDTO): Promise<Vehicle>;
}
