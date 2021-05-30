const VerifyJWT = require('../VerifyJWT');
const _ = require('lodash');

describe('VerifyJWT', () => {
    test('當 request 的 cookie token 值為有效，就會換下一個 regular middleware', (done) => {
        const validJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpbGx5IiwiZW1haWwiOiJiaWxseUBnbWFpbC5jb20iLCJpYXQiOjE2MjIzNDA4NjMsImV4cCI6MTYyMjY0MDg2M30.gsfgK01nq3xsScuFA8C0HlA6jEAclUuk5h5swTCSMn0";
        const middleware = VerifyJWT();

        const res = {};
        _.set(res, 'cookies.token', validJWT); // 用 lodash 的　set() 設定值，相當於 const res = {cookie: {token: validJWT}}

        middleware(res, null, (error) => {
            done(error); // 告訴 Jest 此測試結束。若 error 為空 (即 next()) , 測試通過，若　error 非空(即 next(error))，測試失敗。
        });
    });


    test('當 request 的 cookie token 值為無效，就會換下一個 error-handling middleware', (done) => {
        const invalidJWT = 'invalidJWT.invalidJWT.invalidJWT';
        const middleware = VerifyJWT();

        const res = {};
        _.set(res, 'cookies.token', invalidJWT); // 用 lodash 的　set() 設定值，相當於 const res = {cookie: {token: validJWT}}

        middleware(res, null, (error) => {
            expect(error).toBeInstanceOf(Error); // error 非空(即 next(error)), 測試通過
            done(); // 告訴 Jest 此測試結束
        });
    });
});