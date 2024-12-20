It should offer an API to perform creation and reading of vehicles in the 
system.

## Data model
Vehicle:
id - int
type - string
ownerid - string
brand - string
licensenumber - string

VehicleMessageOutbox
id - int
action - string
vehicledata - string
delivered - boolean (default: false)

## Functionality
- Register Vehicle
- List Vehicles

## Commands
- RegisterVehicle

## Events
- VehicleRegistered

### Stoped at
Creating kafka broker and topics, testing event publising functionality
- how to automatically setup topics in kafka, preferably during container configuration
- how to implement transactional log tailing
- create test cases
- Change Data Capture (CDC)
- Kafka Listeners?
- Kafka Connect
