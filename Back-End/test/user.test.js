//npm run test test/user.test.js

const expect = require('chai').expect;

// import userfile
const user = require('../models/user');

describe('user.js tests', () => {
    describe('user.getUserbyMail() Test', () => {

        user.usr_mail = "mailbisdetest@gmail.com";
        user.usr_password = "Test1";

        it('should return n°id 2', () => {
            const result = getUserByMail(user.usr_mail)
            expect(result).to.equal(2);
        });
        // it('should equal 4', () => {
        //     const result = math.add(2, 2);
        //     expect(result).to.equal(4);
        // });
    });
    
    describe('user.createUser() Test', () => {


        // it('should equal 3', () => {
        //     const result = math.multiply(3, 1);
        //     expect(result).to.equal(3);
        // });

        // it('should equal 10', () => {
        //     const result = math.multiply(5, 2);
        //     expect(result).to.equal(10);
        // });

    });
});