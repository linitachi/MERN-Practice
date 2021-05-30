const VerifyJWT = require('../VerifyJWT');
const _ = require('lodash');
const jsonwebtoken = require('jsonwebtoken');

const MY_SECRET = 'MY_SECRET';

describe('VerifyJWT', () => {
    test('VerifyJWT() 要回傳一個 function', () => {
        const middleware = VerifyJWT();
        const actual = typeof middleware;
        const except = 'function';
        expect(actual).toEqual(except);
    });

    test('當 request 的 cookie token 值為有效，就會換下一個 regular middleware', (done) => {
        const validJWT = jsonwebtoken.sign({}, MY_SECRET); // 產生有效的 token
        const middleware = VerifyJWT({ secret: MY_SECRET, verify: jsonwebtoken.verify }); // 依賴注入

        const res = {};
        _.set(res, 'cookies.token', validJWT);

        middleware(res, null, (error) => {
            done(error);
        });
    });

    test('當 request 的 cookie token 值為無效，就會換下一個 error-handling middleware', (done) => {
        const invalidJWT = 'invalidJWT.invalidJWT.invalidJWT';
        const middleware = VerifyJWT({ secret: MY_SECRET, verify: jsonwebtoken.verify }); // 依賴注入

        const res = {};
        _.set(res, 'cookies.token', invalidJWT);

        middleware(res, null, (error) => {
            expect(error).toBeInstanceOf(Error);
            done();
        });
    });
});