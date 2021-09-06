//npm run test test/reserve.test.js

const server = require ('../server');
const chai  = require ( 'chai');
const chaiHttp   = require ( 'chai-http');
const assert = require('assert');
const user_services = require ('../services/user_services.ts');

chai.use(chaiHttp);
chai.should();



describe('reserveController tests', () => {

    describe("POST /createReserve", () => {
        // Test create a Reserve
        it("should create a reserve", (done) => {
            let Reserve={
                //res_usr_id: 999, 
                res_adv_id: 999,
                res_adv_name:"Maison suspendue", 
                res_date_start: "2021-10-26", 
                res_date_end: "2021-10-28", 
                res_adv_price:50,
                res_adv_tenants:2,
                res_usr_mail:"unittest@gmail.com",
                res_usr_phone:"0453456789"
            }
            chai.request(server)
                .post('/createReserve')
                .send(Reserve)
                .end((err, res) => {
                    //res.should.have.status(200);
                   // res.body.should.have.property('succes');
                    done();
                });
         });
    });

    describe("POST /getReservebyAdvert", () => {
        // Test return reserve(s) by advert
        it("should return reserve link to the selected advert", (done) => {
            let advert={
                adv_id: 999,
                usr_id:999
            }
            chai.request(server)
                .post('/getReservebyAdvert')
                .send(advert)
                .end((err, res) => {
                    //res.should.have.status(200) ||  res.should.have.status(400);
                   // res.body.should.have.property('succes');
                    done();
                });
         });
    });


    describe("POST /getUserReserve", () => {
        // Test return reserve(s) by user
        it("should return reserve link to the selected advert", (done) => {
            let token ="";
            let User={
                res_usr_id:999,
                res_usr_mail:"unittest@gmail.com"
            }
            chai.request(server)
                .post('/getUserReserve')
                .auth(token, { type: 'bearer' })
                .send(User)
                .end((err, res) => {
                    // res.should.have.status(200) ||  res.should.have.status(400);
                   // res.body.should.have.property('succes');
                    done();
                });
         });
    });


    describe("DEL /deleteReserve", () => {
        // Test delete a reserve
        it("should instant delete a Reserve if admin, else need both tenant and owner asked to delete", (done) => {
            let token ="";
            let Reserve={
                res_id: 999,
                res_adv_id: 999,
                res_usr_id:999
            }
            chai.request(server)
                .delete('/deleteReserve')
                .auth(token, { type: 'bearer' })
                .send(Reserve)
                .end((err, res) => {
                    // res.should.have.status(200) ||  res.should.have.status(400);
                   // res.body.should.have.property('succes');
                    done();
                });
         });
    });


    describe("DEL /cancelReserve", () => {
        // Test delete reserve unpaid
        it("should cancel a reserve that an user don't complete the payment", (done) => {
            let Reserve={
                res_usr_id: 999, 
                res_adv_id: 999,
                res_date_start: "2021-10-26", 
                res_date_end: "2021-10-28"
            }
            chai.request(server)
                .delete('/cancelReserve')
                .send(Reserve)
                .end((err, res) => {
                    // res.should.have.status(200) ||  res.should.have.status(400);
                   // res.body.should.have.property('succes');
                    done();
                });
         });
    });

    describe("PUT /validReserve", () => {
        // Test vali a paid reserve
        it("should return reserve valid", (done) => {
            let Reserve={
                res_usr_id: 999, 
                res_adv_id: 999,
                res_date_start: "2021-10-26", 
                res_date_end: "2021-10-28",
                res_payment: true
            }
            chai.request(server)
                .delete('/validReserve')
                .send(Reserve)
                .end((err, res) => {
                    // res.should.have.status(200) ||  res.should.have.status(400);
                   // res.body.should.have.property('succes');
                    done();
                });
         });
    });


    describe("POST /getDatebyAdvRes", () => {
        // Test return dates(reserve) locked for and advert
        it("should return dates already reserved", (done) => {
            let Reserve={
                res_adv_id: 999
            }
            chai.request(server)
                .post('/getDatebyAdvRes')
                .send(Reserve)
                .end((err, res) => {
                    // res.should.have.status(200) ||  res.should.have.status(400);
                   // res.body.should.have.property('succes');
                    done();
                });
         });
    });



});