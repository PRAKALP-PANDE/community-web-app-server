import ResponseMessages from "../../../../constants/responseMessages.js";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import utility from "../../../../utils/utility.js";

const checkFollowCommunity = catchAsyncError(async (req, res, next) => {
    try {
        const { communityId } = req.params;
        const userId = req.user._id;
        const user = await models.User.findById(userId);

        const isFollowingCommunity = user.communitylist.includes(communityId);

        res.status(200).json({
            success: true,
            followed: isFollowingCommunity,
        });
    } catch (error) {
        next(error);
    }
});

export default checkFollowCommunity;
