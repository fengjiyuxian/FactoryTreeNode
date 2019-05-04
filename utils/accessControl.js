'use strict';
const Joi = require('@hapi/joi');
const schemaSet = require('./paramSchema');

class accessControl{
    constructor(){

    }

    async paramValidate(req, res, next) {
        var data = req.body;
        var schema = null;
        if (!data) {
            res.status(200).send({
                error: 'Bad request!'
              });
            return;
        }
        if (req.method == 'POST' && req.path == '/factory') {
            schema = schemaSet.createFactory;
        }else if (req.method == 'PUT' && req.path == '/factory') {
            console.log(schemaSet.updateFactory);
            schema = schemaSet.updateFactory;
            console.log(schema);
        }else if (req.method == 'POST' && req.path == '/factory/generate') {
            schema = schemaSet.generateChildren;
        }else {
            return next();
        }
        let result = Joi.validate(data, schema);
        console.log("res",result);
        if (result.error) {
            res.status(200).send({
                error: "Invalid input parameter!"
            });
            return;
        } else {
            return next();
        }
    }
}


module.exports = new accessControl();