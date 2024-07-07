const sql = require('./sqlite.cjs');
const Usuarios = {
	criar: () => {
		try {
			sql.conectar('database.db');
			sql.executar(
				`CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT UNIQUE)`
			);
			sql.fechar();
		} catch (er) {
			console.error(er);
		}
	},
	inserir: (nome, email) => {
		try {
			sql.conectar('database.db');
			sql.executar(`INSERT INTO usuarios(nome, email) VALUES(?,?)`, [
				nome,
				email
			]);
			sql.fechar();
		} catch (er) {
			console.error(er);
		}
	},
	editar: (nome, email, id) => {
		try {
			sql.conectar('database.db');
			sql.executar(`UPDATE usuarios SET nome=?, email=? WHERE id=?`, [
				nome,
				email,
				id
			]);
			sql.fechar();
		} catch (er) {
			console.error(er);
		}
	},
	excluir: (id) => {
		try {
			sql.conectar('database.db');
			sql.executar(`DELETE FROM usuarios WHERE id=?`, [id]);
			sql.fechar();
		} catch (er) {
			console.error(er);
		}
	},
	buscar: async (where) => {
		try {
			sql.conectar('database.db');
			let rs = await sql.consultar(`SELECT * FROM usuarios ${where}`, []);
			sql.fechar();
			return rs;
		} catch (er) {
			console.error(er);
		}
	}
};
module.exports = Usuarios;
