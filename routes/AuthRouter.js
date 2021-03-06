const _ = require('lodash');
const express = require('express');
const jwt = require('jsonwebtoken');

const EXPIRES_IN = 300 * 1000; // 3 sec

async function verifyUser(data) {
    const username = _.get(data, 'username');
    const password = _.get(data, 'password');

    if (username === 'billy' && password === '1234') { // pass
        return Promise.resolve({
            username,
            email: 'billy@gmail.com',
        });
    }
    return Promise.reject(new Error('Fail'));
}

/**
 *
 * @param {object} dependencies
 */
function createRouter(dependencies) {
    // Get dependencies
    const { config } = dependencies;
    const SECRET = config.JWT.SECRET;

    // Create a router
    var router = express.Router();

    /* POST log */
    router.post('/login', function (req, res, next) {
        console.log(JSON.stringify(req.cookies));
        const data = req.body;
        verifyUser(data)
            .then(user => {
                const token = jwt.sign(user, SECRET, { expiresIn: EXPIRES_IN });
                // res.cookie('token', token, { maxAge: EXPIRES_IN, httpOnly: true, secure: true}); // 本機非 http
                res.cookie('token', token, { maxAge: EXPIRES_IN, httpOnly: true }); // 回應 client ，把 token 存在名為 token 的 cookie　並設定相關屬性
                res.json({
                    token
                });
            })
            .catch(next);
    });
    return router;
}

module.exports = { createRouter };
