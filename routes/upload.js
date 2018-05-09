const Joi = require('joi')
const Boom = require('boom')
const tokenGenerator = require('../utils/qiniuUtil')

let getUpToken = {
    method: 'GET',
    path: '/upload/up',
    options: {
        handler: (req, reply) => {
            let upToken = tokenGenerator.up()
            return {uploadToken: upToken}
        }
    }
}

let getDownloadUrl = {
    method: 'POST',
    path: '/upload/downloadh',
    options: {
        validate: {
            payload: {
                domain: Joi.string().regex(/^http(s)?:\/\/.*/).required(),
                key: Joi.string().regex(/^.*\.(jpg|jpeg|png|gif)$/i).required()
            }
        },
        handler: (req, reply) => {
            const { domain, key } = req.payload
            let downloadUrl = tokenGenerator.down(domain, key)
            return {url: downloadUrl}
        }
    }
}

module.exports = [getUpToken, getDownloadUrl]