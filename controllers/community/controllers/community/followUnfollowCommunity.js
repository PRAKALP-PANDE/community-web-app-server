import ResponseMessages from "../../../../constants/responseMessages.js";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";

const followUnfollowCommunity = catchAsyncError(async (req, res, next) => {
  const { communityId, follow } = req.body;

  if (!communityId) {
    return next(new ErrorHandler(ResponseMessages.GROUP_ID_REQUIRED, 400));
  }

  const community = await models.Community.findById(communityId);

  if (!community) {
    return next(new ErrorHandler(ResponseMessages.GROUP_NOT_FOUND, 404));
  }

  const user = await models.User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler(ResponseMessages.USER_NOT_FOUND, 404));
  }

  if (follow) {
    user.communitylist.push(communityId);
    await user.save();

    community.followerCount++;
    await community.save();

    res.status(201).json({
      success: true,
      message: ResponseMessages.USER_ADDED_TO_GROUP,
    });
  } else {
    const index = user.communitylist.indexOf(communityId);
    if (index !== -1) {
      user.communitylist.splice(index, 1);
      await user.save();

      community.followerCount--;
      await community.save();

      res.status(200).json({
        success: true,
        message: ResponseMessages.USER_REMOVED_FROM_GROUP,
      });
    } else {
      return next(new ErrorHandler(ResponseMessages.USER_NOT_FOLLOWING_GROUP, 400));
    }
  }
});

export default followUnfollowCommunity;
