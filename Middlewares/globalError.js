const globalErrHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).json({
      status: "error",
      error: err.message,
      data: err.data,
    });
  } else if (err.status) {
    res.status(err.status).json({
      status: "error",
      error: err.message,
      data: [],
    });
  } else {
    res.status(500).json({
      status: "error",
      error: "Something went wrong, please try again or check back for a fix",
      data: [],
    });
    console.log(err);
  }
};

module.exports = globalErrHandler;
