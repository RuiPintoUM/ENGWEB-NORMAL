const express = require('express');
const multer = require('multer');
const csvtojson = require('csvtojson');
const Contrato = require('./model/contratos');  // Assegure-se de ajustar o caminho conforme necessário

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const contratos = await csvtojson({
      colParser: {
        "precoContratual": "number",
        "prazoExecucao": "number",
        "dataPublicacao": "date",
        "dataCelebracaoContrato": "date"
      }
    }).fromString(req.file.buffer.toString());

    await Contrato.insertMany(contratos);

    res.send('Data has been saved successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
