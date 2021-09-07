//npm run test test/user.test.js

const server = require ('../server');
const chai  = require ( 'chai');
const chaiHttp   = require ( 'chai-http');
const assert = require('assert');
const user_services = require ('../services/user_services.ts');

chai.use(chaiHttp);
chai.should();



describe('userController tests', () => {

    describe("Clear if there's tests datas",  ()=> {
        it("should clear test user", (done) => {
            user_services.clearTestUser()
            .then(function(result){
                assert.ok(result);
                done();
            })
        });
    });

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
                    res.body.should.have.property('access_token');
                    res.body.should.have.property('refresh_token');
                    done();
                });
         });
    });


    describe("POST /refresh", () => {
        // Test to refresh token
        it("should return a fresh access_token", (done) => {
            let refresh={
                "usr_refresh_token": ""
            }
            chai.request(server)
                .post('/refresh')
                .send(refresh)
                .end((err, res) => {
                    res.should.have.status(498);
                    //res.body.should.be.a('object');
                    //res.body.should.have.property('access_token');
                    done();
                });
         });
    });

    // describe("POST /logout", () => {
    //     // Test to logout an user
    //     it("should logout an user", (done) => {
    //         let refresh={
    //             "usr_refresh_token": ""
    //         }
    //         chai.request(server)
    //             .post('/logout')
    //             .send(refresh)
    //             .end((err, res) => {
    //                 res.should.have.status(400);
    //                 //res.body.should.be.a('object');
    //                 //res.body.should.have.property('access_token');
    //                 done();
    //             });
    //      });
    // });

    describe("Clear if there's tests datas",  ()=> {
        it("should clear test user", (done) => {
            user_services.clearTestUser()
            .then(function(result){
                assert.ok(result);
                done();
            })
        });
    });


});