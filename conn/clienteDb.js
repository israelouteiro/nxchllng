const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

mongoClient.connect("mongodb://localhost/chllnge")
            .then(conn => global.conn = conn.db("chllnge"))
            .catch(err => console.log(err))
 
let findClientes = (callback) => {  
    global.conn.collection("clientes").find({}).toArray(callback);
} 

let insertCliente = (cliente, callback) => {
    global.conn.collection("clientes").insert(cliente, callback);
} 

let findCliente = (id, callback) => {  
    global.conn.collection("clientes").find(new ObjectId(id)).toArray(callback);
}

let findClienteProdutos = (id, callback) => {  
    global.conn.collection("produtos").find({ cliente_id: id }).toArray(callback);
}
 
let updateCliente = (id, cliente, callback) => {
    global.conn.collection("clientes").updateOne({ _id: id }, { $set: cliente }, callback);
} 

let deleteCliente = (id, callback) => {
    global.conn.collection("clientes").deleteOne({_id: ObjectId(id) }, callback);
}

module.exports = { 
	findClientes, 
	insertCliente, 
	findCliente, 
    findClienteProdutos,
	updateCliente, 
	deleteCliente 
}
 