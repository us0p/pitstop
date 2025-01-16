const CREATE_TABLE_CUSTOMER = `
    CREATE TABLE IF NOT EXISTS customer (
	id INTEGER UNIQUE,
	name TEXT,
	telephoneNumber TEXT
    );
`;

const CREATE_TABLE_VEHICLE = `
    CREATE TABLE IF NOT EXISTS vehicle (
	licensenumber TEXT,
	brand TEXT,
	type TEXT,
	id INTEGER UNIQUE,
	ownerid INTEGER,
	FOREIGN KEY (ownerid) REFERENCES customer (id)
    );
`;

const CREATE_TABLE_MAINTENANCEJOB = `
    CREATE TABLE IF NOT EXISTS maintenancejob (
	id INTEGER PRIMARY KEY,
	starttime DATETIME,
	endtime DATETIME,
	vehicleid INTEGER,
	customerid INTEGER,
	description TEXT,
	actualstarttime DATETIME,
	actualendtime DATETIME,
	notes TEXT,
	workshopplanningdate DATETIME,
	FOREIGN KEY (vehicleid) REFERENCES vehicle (id),
	FOREIGN KEY (customerid) REFERENCES customer (id)
    );
`;

export const migrations = [
  CREATE_TABLE_CUSTOMER,
  CREATE_TABLE_VEHICLE,
  CREATE_TABLE_MAINTENANCEJOB,
];
