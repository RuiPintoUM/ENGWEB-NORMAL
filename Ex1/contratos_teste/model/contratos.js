const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
    idcontrato: { type: Number, required: true, unique: true },
    nAnuncio: String,
    tipoprocedimento: String,
    objectoContrato: String,
    dataPublicacao: String,
    dataCelebracaoContrato: String,
    precoContratual: String,
    prazoExecucao: Number,
    NIPC_entidade_comunicante: Number,
    entidade_comunicante: String,
    fundamentacao: String,
  }, { _id: false });
  
  const Contrato = mongoose.model('Contrato', contratoSchema);
  