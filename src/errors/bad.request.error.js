const {STATUS_ERROR_CODES} = require('../common/codes');

class BadRequestError extends Error
{
    constructor(message)
    {
        super(message)
        this.code = STATUS_ERROR_CODES.BAD_REQUEST;
    }
}

module.exports = BadRequestError;