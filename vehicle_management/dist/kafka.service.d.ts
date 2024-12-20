import { RecordMetadata } from "kafkajs";
export declare class VehicleKafkaService {
    private instance?;
    private kafkaClient;
    constructor();
    publish(events: any[]): Promise<RecordMetadata[]>;
}
