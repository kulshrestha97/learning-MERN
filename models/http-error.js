class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Add a message
    this.code = errorCode; // Add error code
  }
}

module.exports = HttpError;
