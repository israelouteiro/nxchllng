const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

mongoClient.connect("mongodb://localhost/chllnge")
            .then(conn => global.conn = conn.db("chllnge"))
            .catch(err => console.log(err))
 
let findProdutos = (callback) => {  
    global.conn.collection("produtos").find({}).toArray(callback);
} 

let insertProduto = (produto, callback) => {
    global.conn.collection("produtos").insert(produto, callback);
} 

let findProduto = (id, callback) => {  
    global.conn.collection("produtos").find(new ObjectId(id)).toArray(callback);
}
 
let updateProduto = (id, produto, callback) => {
    global.conn.collection("produtos").updateOne({ _id : id }, { $set: produto }, callback);
} 

let deleteProduto = (id, callback) => {
    global.conn.collection("produtos").deleteOne({ _id : ObjectId(id) }, callback);
}

module.exports = { 
	findProdutos, 
	insertProduto, 
	findProduto, 
	updateProduto, 
	deleteProduto 
}
 