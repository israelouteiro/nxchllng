var express = require('express');
var router = express.Router();
const clienteDb = require('../conn/clienteDb');
 
/* GET */
router.get('/', function(req, res, next) {  
  clienteDb.findClientes((e, clientes) => {
      if(e) { return console.log(e); } 
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(clientes));  
  	});  
});  

/* GET */
router.get('/:id', function(req, res, next) {   
  var id = req.params.id;
    clienteDb.findCliente(id, (e, cliente) => {
      if(e) { return console.log(e); } 
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(cliente[0]));  
    });  
}); 

/* GET */
router.get('/:id/produtos', function(req, res, next) {   
	var id = req.params.id;
	  clienteDb.findClienteProdutos(id, (e, produtos) => {
      if(e) { return console.log(e); } 
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({cliente_id:id, produtos: produtos}));  
    });  
}); 
 
/* POST */
router.post('/', function(req, res) {
  let name = req.body.name;
  let age = parseInt(req.body.age);
  let cliente = { 'name':name, 'age':age }
  clienteDb.insertCliente(cliente, (err, result) => {
      if(err) { return console.log(err); }  
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(cliente)); 
    });
}) 

/* PUT */
router.put('/:id', function(req, res) {
  let id = req.params.id;
  let name = req.body.name;
  let age = parseInt(req.body.age);
  let cliente = { 'name':name, 'age':age }
  clienteDb.updateCliente(id, cliente, (e, result) => {
        if(e) { return console.log(e); }
        res.setHeader('Content-Type', 'application/json');
      	res.send(JSON.stringify(cliente));
    });
});

/* DELETE */ 
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  clienteDb.deleteCliente(id, (e, r) => {
    if(e) { return console.log(e); }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'status':'success' }));
  });
});

module.exports = router;


