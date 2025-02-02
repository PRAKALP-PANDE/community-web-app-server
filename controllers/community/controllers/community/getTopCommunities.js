import models from "../../../../models/index.js";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ResponseMessages from "../../../../constants/responseMessages.js";

/// GET TOP COMMUNITIES ///

const getTopCommunities = catchAsyncError(async (req, res, next) => {

    const topfive = await models.Community.find({}).sort({ followerCount : -1}).limit(5)    

    res.status(200).json({
        success: true,
        result: topfive
    });
});

export default getTopCommunities;
