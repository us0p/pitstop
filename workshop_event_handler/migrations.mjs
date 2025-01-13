const CREATE_TABLE_VEHICLE = `
    CREATE TABLE IF NOT EXISTS vehicle (
	licensenumber TEXT,
	brand TEXT,
	type TEXT,
	ownerid TEXT, 
	id INTEGER
    );
`;

const CREATE_TABLE_CUSTOMER = `
    CREATE TABLE IF NOT EXISTS customer (
	id INTEGER,
	name TEXT,
	telephoneNumber TEXT
    );
`;

const CREATE_TABLE_MAINTENANCEJOB = `
    CREATE TABLE IF NOT EXISTS maintenancejob (
	id INTEGER PRIMARY KEY,
	starttime DATETIME,
	endtime DATETIME,
	vehicleid REFERENCES vehicle (id),
	customerid REFERENCES customer (id),
	description TEXT,
	actualstarttime DATETIME,
	actualendtime DATETIME,
	notes TEXT,
	workshopplanningdate DATETIME
    );
`;

export const migrations = [
  CREATE_TABLE_VEHICLE,
  CREATE_TABLE_CUSTOMER,
  CREATE_TABLE_MAINTENANCEJOB,
];
