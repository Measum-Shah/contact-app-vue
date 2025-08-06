import constants from '../constants.js';

const errorHandler = (err,req,res,next)=>{
    const statusCode =  err.statusCode || 500;

    let errorTitle = "Unknown Error";
    console.log(statusCode)
    switch(statusCode){
        case constants.constants.VALIDATION_ERROR:
            errorTitle = "Validation Error";
            break;

        case constants.constants.NOT_FOUND:
            errorTitle = "Not Found";
            break;

        case constants.constants.UNAUTHORIZED:
            errorTitle = "Unauthorized";
            break;

        case constants.constants.FORBIDDEN:
            errorTitle = "Forbidden";
            break;

        case constants.constants.SERVER_ERROR:
            errorTitle = "Server Error";
            break;

        default:
            errorTitle = "Something went wrong";
            break;
        }

    res.status(statusCode).json({
        title: errorTitle,
        message: err.message,
        stackTrace: err.stack
    });
}


export default errorHandler