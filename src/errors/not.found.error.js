const {STATUS_ERROR_CODES} = require('../common/codes');

class NotFoundError extends Error
{
    constructor(message)
    {
        super(message)
        this.code = STATUS_ERROR_CODES.NOT_FOUND;
    }
}

module.exports = NotFoundError;