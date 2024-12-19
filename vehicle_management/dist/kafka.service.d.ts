import { RecordMetadata } from "kafkajs";
export declare class VehicleKafkaService {
    private instance?;
    private kafkaClient;
    constructor();
    publish(event: any): Promise<RecordMetadata[]>;
}
