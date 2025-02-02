import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import validators from "../../../../utils/validators.js";
import ResponseMessages from "../../../../constants/responseMessages.js";
import utility from "../../../../utils/utility.js";

/// @route  POST /api/v1/login

const login = catchAsyncError(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone) {
    return next(new ErrorHandler(ResponseMessages.PHONE_REQUIRED, 400));
  }

  if (!password) {
    return next(new ErrorHandler(ResponseMessages.PASSWORD_REQUIRED, 400));
  }

  let user;

  if (phone && validators.validatePhone(phone)) {
    user = await models.User.findOne({ phone: phone }).select("+password");
    if (!user) {
      return next(new ErrorHandler(ResponseMessages.INCORRECT_PHONE, 400));
    }
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorHandler(ResponseMessages.INCORRECT_PASSWORD, 400));
  }

  const authToken = await models.AuthToken.findOne({ user: user._id });

  if (!authToken) {
    try {
      const tokenObj = await utility.generateAuthToken(user, "user");

      return res.status(200).json({
        success: true,
        message: ResponseMessages.LOGIN_SUCCESS,
        token: tokenObj.token,
        user: user,
        expiresAt: tokenObj.expiresAt,
      });
    } catch (error) {
      // Handle any errors that occur during token generation
      return next(new ErrorHandler(ResponseMessages.SOMETHING_WENT_WRONG, 500));
    }
  }

  let token = authToken.token;
  let expiresAt = authToken.expiresAt;

  if (expiresAt < new Date().getTime() / 1000) {
    await authToken.remove();
    const tokenObj = await utility.generateAuthToken(user);

    token = tokenObj.token;
    expiresAt = tokenObj.expiresAt;
  }

  res.status(200).json({
    success: true,
    expiresAt: authToken.expiresAt,
    message: ResponseMessages.LOGIN_SUCCESS,
    // accountStatus: user.accountStatus,
    token: token,
    user: user,
  });
});

export default login;
