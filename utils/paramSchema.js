const Joi = require('@hapi/joi');

const createFactoryDetail = Joi.object().keys({
    name: Joi.string().required(),
    min: Joi.number().integer().required(),
    max: Joi.number().integer().required(),
    status: Joi.string().required()
});

const updateFactoryDetail = Joi.object().keys({
    factoryId: Joi.number().integer().required(),
    name: Joi.string().required(),
    min: Joi.number().integer().required(),
    max: Joi.number().integer().required()
});

const generateChildrenDetail = Joi.object().keys({
    factoryId: Joi.number().integer().required(),
    count: Joi.number().integer().min(0).max(15).required()
});

module.exports = {
    createFactory: createFactoryDetail,
    updateFactory: updateFactoryDetail,
    generateChildren: generateChildrenDetail
};
