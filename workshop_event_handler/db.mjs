import sqlite from "node:sqlite";
const __dirname = import.meta.dirname;

export class Database {
  #db = undefined;

  constructor() {
    if (this.#db) return this.#db;
    this.#db = new sqlite.DatabaseSync(__dirname + "/db" + "/db.sqlite");
  }

  applyMigrations(migrations) {
    migrations.forEach((migration) => {
      this.#db.exec(migration);
    });
  }

  insertVehicle(id, licensenumber, brand, type, ownerid) {
    const query = this.#db.prepare(`
	    INSERT INTO vehicle (
		id,
		licensenumber,
		brand,
		type,
		ownerid
	    ) VALUES (?, ?, ?, ?, ?);`);

    query.run(id, licensenumber, brand, type, ownerid);
  }

  insertCustomer(id, name, telephoneNumber) {
    const query = this.#db.prepare(`
	    INSERT INTO customer (
		id,
		name,
		telephoneNumber
	    ) VALUES (?, ?, ?);
	`);

    query.run(id, name, telephoneNumber);
  }

  planMaintenance(starttime, endtime, customerid, vehicleid, description) {
    const query = this.#db.prepare(`
	    INSERT INTO maintenancejob (
		 starttime,
		 endtime,
		 customerid,
		 vehicleid,
		 description
	    ) VALUES (?, ?, ?, ?, ?);
	`);
    query.run(starttime, endtime, customerid, vehicleid, description);
  }
}
