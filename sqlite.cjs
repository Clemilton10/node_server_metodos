const SQLite = {
	motor: require('sqlite3').verbose(),
	db: null,
	conectar: (db) => {
		try {
			SQLite.db = new SQLite.motor.Database(db, (err) => {
				if (err) {
					console.error(err.message);
				}
			});
		} catch (er) {
			console.error(er);
		}
	},
	executar: (sql, params) => {
		try {
			SQLite.db.run(sql, params, (err) => {
				if (err) {
					console.error(err.message);
				}
			});
		} catch (er) {
			console.error(er);
		}
	},
	consultar: (sql, params) => {
		try {
			return new Promise((resolve, reject) => {
				SQLite.db.all(sql, params, (err, rows) => {
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				});
			});
		} catch (er) {
			console.error(er);
		}
	},
	fechar: () => {
		try {
			SQLite.db.close((err) => {
				if (err) {
					console.error(err.message);
				}
			});
		} catch (er) {
			console.error(er);
		}
	}
};

module.exports = SQLite;
