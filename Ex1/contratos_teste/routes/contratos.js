const express = require('express');
const multer = require('multer');
const csvtojson = require('csvtojson');
const Contrato = require('../model/contratos');  // Certifique-se de que o caminho está correto
const createError = require('http-errors');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Rota para buscar todos os contratos com filtros
router.get('/contratos', async (req, res) => {
    const { entidade, tipo } = req.query;

    let query = {};

    if (entidade) {
        query.entidade_comunicante = new RegExp(`^${entidade}$`, 'i');  // Case insensitive match
    }

    if (tipo) {
        query.tipoprocedimento = tipo;
    }

    const contratos = await Contrato.find(query);
    res.json(contratos);
});

// Rota para buscar todas as entidades distintas
router.get('/contratos/entidades', async (req, res) => {
    const entidades = await Contrato.distinct('entidade_comunicante');
    res.json(entidades.sort());
});

// Rota para buscar todos os tipos distintos de procedimento
router.get('/contratos/tipos', async (req, res) => {
    const tipos = await Contrato.distinct('tipoprocedimento');
    res.json(tipos.sort());
});

// Rota para buscar um contrato específico pelo ID
router.get('/contratos/:id', async (req, res) => {
    const contrato = await Contrato.findOne({ idcontrato: req.params.id });
    res.json(contrato);
});

// Rota para criar um novo contrato
router.post('/contratos', async (req, res) => {
    try {
        const novoContrato = new Contrato(req.body);
        await novoContrato.save();
        res.status(201).json(novoContrato);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um contrato pelo ID
router.delete('/contratos/:id', async (req, res) => {
    await Contrato.deleteOne({ idcontrato: req.params.id });
    res.sendStatus(204);
});

// Rota para atualizar um contrato pelo ID
router.put('/contratos/:id', async (req, res) => {
    const contrato = await Contrato.findOneAndUpdate({ idcontrato: req.params.id }, req.body, { new: true });
    res.json(contrato);
});

module.exports = router;