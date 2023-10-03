// error.js

const errorHandler = (err, req, res, next) => {
    // console.error(err);
  
    let statusCode = 500; // Default status code for internal server error
    let message = "Internal Server Error";
  
    if (err.message === "Invalid Id") {
      statusCode = 404;
      message = "Invalid Id";
    } else if (err.message === "User Already Exists") {
      statusCode = 400; // Bad Request
      message = "User Already Exists";
    } else if (err.message === "Invalid Email and Password") {
      statusCode = 401; // Unauthorized
      message = "Invalid Email and Password";
    } // Add more error cases as needed
  
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
export default errorHandler;  