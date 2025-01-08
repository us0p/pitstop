# Workshop Management Service
This service contains 2 parts: an API for managing the workshop planning 
and an event-handler that handles events and builds a read-model that is 
used by the API.

## API
This is an API that is used to manage Maintenance Jobs in the system. 
Because we want to be able to keep Workshop Management up and running even 
when other services are down, the API also offers functionality to retrieve
vehicle and customer information from the read-model. This read-model is 
filled by the event-handler (described below).

This service handles the following commands:
- PlanMaintenanceJob
- FinishMaintenanceJob

This service publishes the following events:
- WorkshopPlanningCreated
- MaintenanceJobPlanned
- MaintenanceJobFinished

Within this bounded-context I've used a DDD approach. The Workshop Planning
aggregate handles all commands and yields events that will then be 
published using the message-broker.

Because this aggregate uses event-sourcing for persisting its state, every 
command that comes in is first transformed into an event that is handled by
the aggregate. This will actually change the internal state of the 
aggregate. The state is persisted by storing the list of all events that 
occurred for 1 aggregate instance. When another command comes in for an 
aggregate instance (identified by its unique Id), all events are replayed 
and handled by the aggregate to return it to its former state. The 
aggregate offers a specific constructor that takes a list of events and 
replays them internally.

## Event-handler
The event-handler ingests events containing information about Customers and
Vehicles coming from the message-broker. It only handles events from the 
message-broker and offers no API. As stated above, it builds a read-model 
that is used by the front-end when scheduling maintenance jobs. This 
ensures that we can always schedule new maintenance jobs and manage 
existing jobs even though the Customer Service or Vehicle Service is 
offline.

This service handles the following events:
- CustomerRegistered
- VehicleRegistered
- MaintenanceJobPlanned
- MaintenanceJobFinished

## What i got
event handler write events to the read model which groups vehicle, customer
and maintenance plannings in a read only database

the aggregate (event sourcing) handle incomming commands and store them in 
? (event store) and yields events that are published in the message broker.
