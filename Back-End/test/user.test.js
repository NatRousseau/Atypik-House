//npm run test test/user.test.js

const expect = require('chai').expect;
const userController = require('../controllers/userController')

describe('userController tests', () => {

    describe('register Test', () => {

        datasReceived= {
            "usr_mail": "maildetest@gmail.com",
            "usr_phone": "3353486789",
            "usr_password": "Test1",
            "usr_firstName": "John",
            "usr_lastName":"Doe"
        };

        it('should return a Succes', () => {
            const result = userController.register(datasReceived);
            expect(result).to.equal({"succes": "Reussite de l'enregistrement."});
        });
        // it('should equal 4', () => {
        //     const result = math.add(2, 2);
        //     expect(result).to.equal(4);
        // });
    });


    describe('login Test', () => {

        datasReceived= {"usr_mail":"maildetest@gmail.com",
        "usr_password":"Test1"};

        it('should return n°id 2', () => {
            const result = userController.login(datasReceived);
            expect(result).to.equal({"succes": "Reussite de l'enregistrement."});
        });
        // it('should equal 4', () => {
        //     const result = math.add(2, 2);
        //     expect(result).to.equal(4);
        // });
    });
    
    // describe('user.createUser() Test', () => {


    //     // it('should equal 3', () => {
    //     //     const result = math.multiply(3, 1);
    //     //     expect(result).to.equal(3);
    //     // });

    //     // it('should equal 10', () => {
    //     //     const result = math.multiply(5, 2);
    //     //     expect(result).to.equal(10);
    //     // });

    // });
});