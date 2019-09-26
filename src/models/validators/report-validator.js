const Ajv = require('ajv');

const jsonValidator = new Ajv();
const schema = require('./report.scheme')
const validate = jsonValidator.compile(schema);

module.exports = (value) => {
    if (!validate(value)) {
        throw new Error('Json scheme validation error')
    }
}
