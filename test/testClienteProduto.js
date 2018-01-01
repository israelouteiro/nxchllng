const assert = require('assert');
const should = require('should');
const request = require('request');
const expect = require('chai').expect;
const util = require("util");

let baseUrl = "http://localhost:3000/";
let cliente_id;
let produto_id;
 
const createCliente = () => {
	describe('create cliente - TCP', function (){
		it('create cliente', (done) => {  
			let cliente = { name:'Another Dev', age: 27 }
			request.post( { url:`${ baseUrl }clientes`, form: cliente }, 
				(error,response,body) => {
						expect(response.statusCode).to.equal(200);
						console.log(body); 
						cliente_id = JSON.parse(body)._id;   
						createProduto();
					done();
				})
		})
	});
}

const createProduto = () => {
	describe('create produto - TCP', function (){
		it('create produto', (done) => {  
			let produto = { name:'iPhone 8', price: 3999.90 , cliente_id:cliente_id }
			request.post( { url:`${ baseUrl }produtos`, form: produto }, 
				(error,response,body) => {
						expect(response.statusCode).to.equal(200);
						console.log(body); 
						produto_id = JSON.parse(body)._id;  
						produtosCliente();
					done();
				})
		})
	});
}

const produtosCliente = () => {
	describe('produtos do cliente - TCP', function (){
		it('products of client', (done) => {   
			request.get( { url:`${ baseUrl }clientes/${ cliente_id }/produtos` }, 
				(error,response,body) => {
						expect(response.statusCode).to.equal(200);
						console.log(body);
						deleteCliente(); 
						deleteProduto();  
					done();
				})
		})
	});
}

const deleteProduto = () => {
	describe(`delete produto ${ produto_id } - TCP`, function (){
		it('delete produto', (done) => {  
			request.delete({url:`${ baseUrl }produtos/${ produto_id }`}, 
				(error,response,body)=>{
						expect(response.statusCode).to.equal(200);
						console.log(body);
					done();
				})
		})
	});
}

const deleteCliente = () => {
	describe(`delete cliente ${ cliente_id } - TCP`, function (){
		it('delete cliente', (done) => {  
			request.delete({url:`${ baseUrl }clientes/${ cliente_id }`}, 
				(error,response,body)=>{
						expect(response.statusCode).to.equal(200);
						console.log(body);
					done();
				})
		})
	});
}

describe('cliente produtos testes - TCP', function (){
	createCliente(); 
})



 