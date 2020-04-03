const express = require("express");                       //Mando llamar a express
const router = express.Router();                          //Utilizo el motodo router de express
const moment = require('moment');  

const path = require('path');
const { unlink } = require('fs-extra');

const Product = require('../schema.js');

router.get('/all', async (req, res) => {
    const items = await Product.find().sort('-_id');
    res.json(items);
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
  //res.json({'message': 'Book Saved'});
  const items = await Product.find().sort('-_id');
  res.json({'message': 'Book Saved','items': items});
});

router.delete('/items/:id', async (req, res) => {
    //const book = await Book.findByIdAndDelete(req.params.id);
    //await unlink(path.resolve('./backend/public/' + book.imagePath));
    //res.json({message: 'Book Deleted'});
});


module.exports = router;