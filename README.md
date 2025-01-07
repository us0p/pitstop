## Todo
- Add architecture and service functionality explanation
- Add transactional outbox and transactional log tailing
- Add Tests
- Use Docker Swarm to provide service isolation


# Pitstop
This project is a clone of the following [Pitstop repo](https://github.com/EdwinVW/pitstop)
The goal is to apply principles, patterns and concepts related to 
microservices architecture.

The goal of this project is to understand microservices architecture 
components in practice and common technologies utilized to implement and 
solve microservices challenges and patterns like message brokers, log 
aggregation, metrics, service discovery and etc.
To connect all the components in the architecture in compliance with 
industry standards.
The secondary goal is to gain familiarity with the Nest.js and Prisma 
libraries.

discover common technologies used in microservice architecture, or, common 
technologies used for central components in a microservices architecture, 
like, message brokers, event stores, api gateways and more.
understand how the DDD model is used in the architecture.

## Architecture
**Vehicle Management Service**
Functionality: CREATE and READ (list and single by unique ID) vehicles.
Commands: RegisterVehicle.
Events: P-VehicleRegistered.
Structure: API, Database, MessageBroker Connection.

**Customer Management Service**
Functionality: CREATE and READ (list and single by unique ID) customers.
Commands: RegisterCustomer.
Events: P-CustomerRegistered.
Structure: API, Database, MessageBroker Connection.

**Workshop Management Service**
Core service of the application, used to manage maintenance jobs in the 
system. It must be able to function even when other services are down, 
because of that, the API also offers functionality to retrieve vehicle and 
customer information from the read-model. The read-model is filled by the 
event-handler.
The workshop planning aggregate  handles all commands and yields events 
that will then be published using the message-broker.
Every command that comes in is first transformed into an event that is 
handled by the aggregate. This will actually change the internal state of 
the aggregate. The state is persisted by storing the list of all events 
that ocurred for 1 aggregate instance. When another command comes in for an
aggregate instance (identified by its unique ID), all events are replayyed 
and handled by the aggregate to return it to its former state. The 
aggregate offers a specific constructor that takes a list of events and 
replays them internally.

Commands: PlanMaintenanceJob, FinishMaintenanceJob.
Events: 
- P-WorkshopPlanningCreated
- P-MaintenanceJobPlanned
- P-MaintenanceJobFinished
- C-VehicleRegistered
- C-CustomerRegistered
- C-MaintenanceJobPlaned
- C-MaintenanceJobFinished
Structure: API, Event Store, Read Models, Event Handler, MessageBroker 
           Connection.

Event Handler: Ingest events containing information about Customers and 
Vehicles comming from the message-broker. Only handles events from the 
message-broker and offers no API. It builds the read-model. It ensures that
we can always schedule new maintenance jobs and manage existing jobs even 
though the Customer Service or Vehicle Service are offline.


Technologies used:
- Node.js
- Nest.js
- Kafka
- Prisma
- Typescript
- Docker

Patterns used:
- Database per service
- Saga (coreography)
    - Transactional outbox
        - Transactional log tailing
- Event sourcing
- CQRS
- Idempotent consumer
- Log aggregation
- Audit logging
- Circuit breaker

Principles used:
- OOP
- SOLID
- Clean code
- Clean architecture
