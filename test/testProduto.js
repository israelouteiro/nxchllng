const assert = require('assert');
const should = require('should');
const request = require('request');
const expect = require('chai').expect;
const util = require("util");

let baseUrl = "http://localhost:3000/";
let produto_id;
 
const createProduto = () => {
	describe('create produto', function (){
		it('create produto', (done) => {  
			let produto = { name:'iPhone X', price: 6999.90 , cliente_id:'' }
			request.post( { url:`${ baseUrl }produtos`, form: produto }, 
				(error,response,body) => {
						expect(response.statusCode).to.equal(200);
						console.log(body); 
						produto_id = JSON.parse(body)._id;  
						readAllProdutos(); 
						readProduto();  
					done();
				})
		})
	});
}

const readProduto = () => {
	describe(`read produto ${ produto_id }`, function (){
		it('read produto', (done) => {  
			request.get({url:`${ baseUrl }produtos/${ produto_id }`}, 
				(error,response,body)=>{
						expect(response.statusCode).to.equal(200);
						console.log(body);
						updateProduto();
					done();
				})
		})
	});
}

const updateProduto = () => {
	describe(`update produto ${ produto_id }`, function (){
		it('update produto', (done) => {  
			let produto = { name:'iPhone X', price: 6999.90 , cliente_id:'' }
			request.put({url:`${ baseUrl }produtos/${ produto_id }`, form: produto }, 
				(error,response,body)=>{
						expect(response.statusCode).to.equal(200);
						console.log(body);
						deleteProduto();
					done();
				})
		})
	});
}

const deleteProduto = () => {
	describe(`delete produto ${ produto_id }`, function (){
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

const readAllProdutos = () => {
	describe('read produtos', function (){
		it('read produtos', function (done){  
			request.get({ url:`${ baseUrl }produtos` }, 
				 function (error,response,body){
						expect(response.statusCode).to.equal(200);
						console.log(body);
					done();
				})
		})
	});
 }

describe('produto testes', function (){
	createProduto(); 
})