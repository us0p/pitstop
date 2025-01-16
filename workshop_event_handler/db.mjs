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
		 description,
		 workshopplanningdate
	    ) VALUES (?, ?, ?, ?, ?, ?);
	`);

    query.run(
      starttime,
      endtime,
      customerid,
      vehicleid,
      description,
      new Date().toISOString(),
    );
  }

  finishMaintenance(maintenanceid, actualstarttime, actualendtime, notes) {
    const query = this.#db.prepare(`
	    UPDATE maintenancejob
	    SET actualstarttime = ?, actualendtime = ?, notes = ?
	    WHERE id = ?;
	`);
    query.run(actualstarttime, actualendtime, notes, maintenanceid);
  }

  getVehicle(id) {
    const query = this.#db.prepare(`
	    SELECT * FROM vehicle WHERE id = ?;
	`);
    return query.get(id);
  }

  getCustomer(id) {
    const query = this.#db.prepare(`
	    SELECT * FROM customer WHERE id = ?;
	`);
    return query.get(id);
  }
}
