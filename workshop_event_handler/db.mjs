import sqlite from "node:sqlite";

export class Database {
  #db = undefined;

  constructor() {
    if (this.#db) return this.#db;
    this.#db = new sqlite.DatabaseSync("db.sqlite");
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
}
