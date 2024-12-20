import { Vehicle } from "@prisma/client";
import { VehicleDTO } from './vehicle.dto';
import { VehicleKafkaService } from './kafka.service';
export declare class VehicleDatabaseService {
    private readonly vehicleKafkaService;
    private dbClient?;
    private instance?;
    constructor(vehicleKafkaService: VehicleKafkaService);
    getMany(): Promise<Vehicle[]>;
    create(vehicle: VehicleDTO): Promise<Vehicle>;
}
