// cReating token and saving in cookie
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const sendToken = catchAsyncErrors(async (user, statusCode, res) => {
  const token = await user.getJWTToken();
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
});

module.exports = sendToken;
