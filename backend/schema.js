const { Schema, model } = require('mongoose');
const moment = require('moment');                         //Mando a llamar a moment para poder dar formato a la fecha

const BookSchema = new Schema({
    producto: { type: String, required: true },
    marca: { type: String, required: true },
    descripcion: { type: String, required: true },
    modelo: { type: String, required: true },
    precio: { type: String, required: true },
    imagePath: { type: String, required: true },
    filename: { type: String, required: true },
    created_at: { type: String, default: function() {  return moment().format(); } },
    modified_at: { type: String, default: function() {  return moment().format(); } }
});

module.exports = model('Product', BookSchema);

