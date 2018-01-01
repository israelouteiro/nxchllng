var express = require('express');
var router = express.Router();
const produtoDb = require('../conn/produtoDb');
 
/* GET */
router.get('/', function(req, res, next) {  
  produtoDb.findProdutos((e, produtos) => {
      if(e) { return console.log(e); } 
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(produtos));  
  	});  
});  

/* GET */
router.get('/:id', function(req, res, next) {   
	var id = req.params.id;
	  produtoDb.findProduto(id, (e, produto) => {
      if(e) { return console.log(e); } 
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(produto[0]));  
    });  
}); 
 
/* POST */
router.post('/', function(req, res) {
  let name = req.body.name;
  let price = parseInt(req.body.price);
  let cliente_id = parseInt(req.body.cliente_id);
  let produto = { 'name':name, 'price':price, 'cliente_id':cliente_id }
  produtoDb.insertProduto(produto, (err, result) => {
      if(err) { return console.log(err); }  
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(produto)); 
    });
}) 

/* PUT */
router.put('/:id', function(req, res) {
  let id = req.params.id;
  let name = req.body.name;
  let price = parseInt(req.body.price);
  let cliente_id = parseInt(req.body.cliente_id);
  let produto = { 'name':name, 'price':price, 'cliente_id':cliente_id }
  produtoDb.updateProduto(id, produto, (e, result) => {
        if(e) { return console.log(e); }
        res.setHeader('Content-Type', 'application/json');
      	res.send(JSON.stringify(produto));
    });
});

/* DELETE */ 
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  produtoDb.deleteProduto(id, (e, r) => {
    if(e) { return console.log(e); }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'status':'success' }));
  });
});

module.exports = router;


