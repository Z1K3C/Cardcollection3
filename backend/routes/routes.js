const express = require("express");                       //Mando llamar a express
const router = express.Router();                          //Utilizo el motodo router de express
const moment = require('moment');  

const path = require('path');
const { remove } = require('fs-extra');

const Product = require('../schema.js');

router.get('/all', async (req, res) => {
    const items = await Product.find().sort('-_id');
    res.json({'message': 'Productos encontrados','items': items});
});

router.post('/add', async (req, res) => {
  const { producto, marca, descripcion, modelo, precio } = req.body;
  const created_at = moment().format('LLL');
  const modified_at = moment().format('LLL');
  const newItem = new Product({ producto, marca, descripcion, modelo, precio, created_at, modified_at });
  if(req.file != undefined){
    newItem.imagePath = req.file.path;
    newItem.filename = req.file.filename;
  }
  await newItem.save();
  const items = await Product.find().sort('-_id');
  res.json({'message': 'Producto salvado','items': items});
});

router.get('/edit/:id', async (req, res) => {
  const productONE = await Product.findById(req.params.id);
  res.json({'message': 'Producto a editar: ' + productONE.producto,'items': productONE});
});

router.post('/edited', async (req, res) => {
  const { producto, marca, descripcion, modelo, precio } = req.body;
  const modified_at = moment().format('LLL');
  let items;
  await Product.findByIdAndUpdate(req.body.id, { producto, marca, descripcion, modelo, precio, modified_at });
  if(req.file != undefined){
    items = await Product.findById(req.body.id);
    await remove(path.resolve('./public/img/' + items.filename));
    const imagePath = req.file.path;
    const filename = req.file.filename;
    await Product.findByIdAndUpdate(req.body.id, { imagePath, filename });
  }
  items = await Product.findById(req.body.id);
  res.json({'message': 'Producto actualizado','items': items});
});

router.delete('/items/:id', async (req, res) => {
    //const book = await Book.findByIdAndDelete(req.params.id);
    //await unlink(path.resolve('./backend/public/' + book.imagePath));
    //res.json({message: 'Book Deleted'});
});


module.exports = router;