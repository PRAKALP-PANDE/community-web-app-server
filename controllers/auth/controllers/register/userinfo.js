import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import utility from "../../../../utils/utility.js";
import validators from "../../../../utils/validators.js";
import ResponseMessages from "../../../../constants/responseMessages.js";

/// @route  PATCH /api/v1/register

const userinfo = catchAsyncError(async (req, res, next) => {
  let {
    country,
    state,
    city,
    fullname,
    username,
    bio,
    profileimage,
    interestedarea,
    followingCount,
  } = req.body;

  if (!state) {
    return next(new ErrorHandler(ResponseMessages.STATE_NAME_REQUIRED, 400));
  }

  if (!fullname) {
    return next(new ErrorHandler(ResponseMessages.FIRST_NAME_REQUIRED, 400));
  }

  if (fullname && !validators.validateName(fullname)) {
    return next(new ErrorHandler(ResponseMessages.INVALID_FIRST_NAME, 400));
  }

  if (!username) {
    return next(new ErrorHandler(ResponseMessages.USERNAME_REQUIRED, 400));
  }

  if (username && !validators.validateUsername(username)) {
    return next(new ErrorHandler(ResponseMessages.INVALID_USERNAME, 400));
  }

  const isUsernameAvailable = await utility.checkUsernameAvailable(username);

  if (!isUsernameAvailable) {
    return next(new ErrorHandler(ResponseMessages.USERNAME_NOT_AVAILABLE, 400));
  }

  const user = await models.User.findOne({ _id: req.payload.id });

  if (!user) {
    return next(new ErrorHandler(ResponseMessages.USER_NOT_FOUND, 400));
  }

  user.country = country || user.country;
  user.state = state || user.state;
  user.city = city || user.city;
  user.fullname = fullname || user.fullname;
  user.username = username || user.username;
  user.bio = bio || user.bio;
  user.profileimage = profileimage || user.profileimage;
  user.interestedarea = interestedarea || user.interestedarea;
  user.followingCount = followingCount || user.followingCount;

  await user.save();

  // const tokenObj = await utility.generateAuthToken(user);

  res.status(200).json({
    success: true,
    message: ResponseMessages.USERINFO_UPDATE_SUCCESS,
    //   "token": tokenObj.token
    data: {
      user: user,
    },
  });
});

export default userinfo;
