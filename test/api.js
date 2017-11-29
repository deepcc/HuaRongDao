const express = require('express')
const mockjs = require('mockjs')

const router = express.Router()

router.all('/*', function(req, res, next) {
    res.header({
        // 'Content-Type': 'application/x-www-form-urlencoded',

        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Headers': 'x-requested-with,content-type',
        // 'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Expires': '0',
        'Pragma': 'no-cache'
    });
    // req.params
    var data = mockjs.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }],
        api: req.params,
        code: 0,
        message: '成功'

    })

    res.send(data)

    if (req.method == 'OPTIONS') { res.send(200); }
})
module.exports = router