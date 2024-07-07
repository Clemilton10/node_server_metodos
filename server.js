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
