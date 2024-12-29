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
- setup automatic topic creation
- create test cases

KafkaConfiguration, KafkaConnect, KafkaListeners
