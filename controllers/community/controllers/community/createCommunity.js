import ResponseMessages from "../../../../constants/responseMessages.js";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import utility from "../../../../utils/utility.js";

/// CREATE GROUP ///

const createCommunity = catchAsyncError(async (req, res, next) => {
  let {
    title,
    description,
    profileImage,
    topicIdList,
    // userId
  } = req.body;

  if (!title) {
    return next(new ErrorHandler(ResponseMessages.GROUP_NAME_REQUIRED, 400));
  }

  const isGroupNameAvailable = await utility.checkGroupNameAvailable(title);

  if (!isGroupNameAvailable) {
    return next(new ErrorHandler(ResponseMessages.GROUP_NAME_NOT_AVAILABLE, 400));
  }

  if (!description) {
    return next(new ErrorHandler(ResponseMessages.GROUP_DESCRIPTION_REQUIRED, 400));
  }

  if (!profileImage) {
    return next(new ErrorHandler(ResponseMessages.GROUP_PROFILE_IMAGE_REQUIRED, 400));
  }

  if (!topicIdList) {
    return next(new ErrorHandler(ResponseMessages.GROUP_TOPIC_REQUIRED, 400));
  }

  const newcommunity = await models.Community.create({
    title: title,
    description: description,
    profileImage: profileImage,
    topicIdList: topicIdList,
    userId: req.user._id
  });


  let user = await models.User.findById(req.user._id);
  user.communitylist.push(newcommunity._id);
  await user.save();

  res.status(201).json({
    success: true,
    message: ResponseMessages.GROUP_CREATE_SUCCESS,
    community: newcommunity,
  });
});

export default createCommunity;
