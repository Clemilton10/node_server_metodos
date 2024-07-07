# Instalação

| [Home](./README.md) | [Vs Code](./002_vs-code.md) | [HTML Fetch](./006_html_fetch.md) | [Extensões Chrome](./003_extensoes_chrome.md) |

### Instalador do Node

[https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)

```sh
node -v
npm -v
```

### Instalando o yarn

```sh
npm install -g yarn
```

### Instalando pacotes Globais

```sh
# yarn global add nodemon # esse não deu certo
npm install -g nodemon --save-dev
```

-   Crie uma pasta
-   Entre nela e crie um arquivo `package.json`

```json
{
	"name": "server",
	"version": "1.0.0",
	"description": "",
	"main": "server.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"cors": "^2.8.5",
		"express": "^4.16.2",
		"multer": "^1.4.5-lts.1",
		"sqlite3": "^5.1.7"
	}
}
```

```sh
yarn install
```

### sqlite.cjs

```js
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
```

### usuarios.cjs

```js
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
```

### server.js

```js
const Usuarios = require('./usuarios.cjs');
const express = require('express');
const multer = require('multer');
const cors = require('cors');

// Configuração do multer para lidar com uploads de formulário
const upload = multer();

// Server Express
const app = express();

// Ativando as permissões CORS
app.use(cors());

app.get('/usuarios', async (req, res) => {
	const rs = await Usuarios.buscar('');
	res.json(rs);
});
app.post('/usuarios', upload.none(), async (req, res) => {
	try {
		let { nome, email } = await req.body;
		Usuarios.inserir(nome, email);
		res.json({ nome: nome, email: email });
	} catch (er) {
		console.error(er);
		res.send(er);
	}
});
app.put('/usuarios', upload.none(), async (req, res) => {
	try {
		let { nome, email, id } = await req.body;
		Usuarios.editar(nome, email, id);
		res.json({ nome: nome, email: email, id: id });
	} catch (er) {
		console.error(er);
		res.send(er);
	}
});
app.delete('/usuarios/:id', upload.none(), async (req, res) => {
	try {
		const id = req.params.id;
		Usuarios.excluir(id);
		res.json({ id: id });
	} catch (er) {
		console.error(er);
		res.send(er);
	}
});
app.listen(88, () => {
	console.log('❱ rodando na porta 88');
	console.log('http://localhost:88');
	return;
});
```

| [Home](./README.md) | [Vs Code](./002_vs-code.md) | [HTML Fetch](./006_html_fetch.md) | [Extensões Chrome](./003_extensoes_chrome.md) |
