//error is node's default class and we are inheriting it
class ErrorHandler extends Error{
    constructor(message,statusCode)
    {
        super(message)
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports = ErrorHandler