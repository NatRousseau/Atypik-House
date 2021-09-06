//npm run test test/user.test.js

// var newUser =require('../dummy/userDummy');
// var User = require('../dummy/userDummy');
const server = require ('../server');
const chai  = require ( 'chai');
const chaiHttp   = require ( 'chai-http');
const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const userController   = require ('../controllers/userController');
const clearTestUser = require ('../services/user_services/clearTestUser')

chai.use(chaiHttp);
chai.should();



describe('userController tests', () => {

    clearTestUser();

    describe("POST /register", () => {
        // Test to register a new user
        it("should register an user", (done) => {
            let newUser={
                usr_mail: "unittest@gmail.com",
                usr_phone: "0453456789",
                usr_password: "Test1",
                usr_firstName: "Michel",
                usr_lastName: ""
            }
            chai.request(server)
                 .post('/register')
                 .send(newUser)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('succes');
                     done();
                  });
         });
    });


    describe("POST /login", () => {
        // Test to register a new user
        it("should login an user", (done) => {
            let User={
                usr_mail: "unittest@gmail.com",
                usr_password: "Test1"
            }
            chai.request(server)
                 .post('/login')
                 .send(User)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('succes');
                     done();
                  });
         });
    });


});