// middlewares/VerifyJWT.js
const _ = require('lodash');
const jsonwebtoken = require('jsonwebtoken');

// const SECRET = '123'; // 要和簽發時一樣，所以可以放在 ./configs/config.js 中
const config = require('../configs/config');
const SECRET = config.JWT.SECRET;

async function verifyJWT(jwt, { secret, verify }) {
    if (!jwt) {
        return Promise.reject(new Error('No JWT'));
    }
    const decoded = verify(jwt, secret);
    return decoded;
}


module.exports = function (options = {}) {
    const { tokenPath = 'cookies.token', secret = SECRET, verify = jsonwebtoken.verify } = options; // tokenPath 是取出 token 的路徑
    return function (req, res, next) {
        const jwt = _.get(req, tokenPath);
        verifyJWT(jwt, { secret, verify })
            .then(decoded => {
                console.log(decoded);
                next(); // next middleware
            })
            .catch(next);
    };
}