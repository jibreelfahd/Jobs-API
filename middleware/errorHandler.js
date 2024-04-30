import { CustomAPIError } from "../errors/index.js";
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(err)
    // if(err instanceof CustomAPIError) {
    //     return res.status(err.statusCodes).json({ msg: err.message });
    // }
    let customError = {
        message: err.message || 'Something went wrong, Try Again Later',
        statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if (err.message.includes('user validation failed')) {
        let error = { name: '', email: '', password: '' }
        Object.values(err.errors).forEach(({ properties }) => {
            customError.message = error[properties.path] = properties.message;
        });
        customError.statusCodes = StatusCodes.BAD_REQUEST;
    }

    if(err.code || err.code === 11000) {
        customError.message = 'Duplicate key, this user is already registered';
        customError.statusCodes = StatusCodes.BAD_REQUEST;
    }

    if (err.name === 'CastError') {
        customError.message = `No item with id: ${err.value} found`;
        customError.statusCodes = StatusCodes.NOT_FOUND;
    }
    return res.status(customError.statusCodes).json({ msg: customError.message });
    // return res.status(customError.statusCodes).json({ err });
}

export default errorHandlerMiddleware;