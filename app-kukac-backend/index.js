const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const Controller = require('./controllers/controller');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(cors());

app.post('/', async function (req, res, next) {
    dados = req.body;

    dados.cep = dados.cep.replace(/[.\-]/gi, '');
    controller = new Controller();

    dados.endereco = await controller.getEndereco(dados.cep);

    dados.rendaPerCapita = await controller.calculaRendaPerCapita(parseFloat(dados.renda), parseInt(dados.dependentes));

    res.status(200).send(dados);
});

app.listen(3000, '0.0.0.0', () => { console.log('funcionou') });