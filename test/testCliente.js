const assert = require('assert');
const should = require('should');
const request = require('request');
const expect = require('chai').expect;
const util = require("util");

let baseUrl = "http://localhost:3000/";
let cliente_id;
 
const createCliente = () => {
	describe('create cliente', function (){
		it('create cliente', (done) => {  
			let cliente = { name:'Some Dev', age: 30 }
			request.post( { url:`${ baseUrl }clientes`, form: cliente }, 
				(error,response,body) => {
						expect(response.statusCode).to.equal(200);
						console.log(body); 
						cliente_id = JSON.parse(body)._id;  
						readAllCliente(); 
						readCliente();  
					done();
				})
		})
	});
}

const readCliente = () => {
	describe(`read cliente ${ cliente_id }`, function (){
		it('read cliente', (done) => {  
			request.get({url:`${ baseUrl }clientes/${ cliente_id }`}, 
				(error,response,body)=>{
						expect(response.statusCode).to.equal(200);
						console.log(body);
						updateCliente();
					done();
				})
		})
	});
}

const updateCliente = () => {
	describe(`update cliente ${ cliente_id }`, function (){
		it('update cliente', (done) => {  
			let cliente = { name:'Some Devx', age: 25 }
			request.put({url:`${ baseUrl }clientes/${ cliente_id }`, form: cliente }, 
				(error,response,body)=>{
						expect(response.statusCode).to.equal(200);
						console.log(body);
						deleteCliente();
					done();
				})
		})
	});
}

const deleteCliente = () => {
	describe(`delete cliente ${ cliente_id }`, function (){
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

const readAllCliente = () => {
	describe('read clientes', function (){
		it('read clientes', function (done){  
			request.get({ url:`${ baseUrl }clientes` }, 
				 function (error,response,body){
						expect(response.statusCode).to.equal(200);
						console.log(body);
					done();
				})
		})
	});
 }

describe('cliente testes', function (){
	createCliente(); 
})