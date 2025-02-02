import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../helpers/errorHandler.js";
import models from "../../../models/index.js";
import utility from "../../../utils/utility.js";

/// CREATE GROUP ///

const createBanner = catchAsyncError(async (req, res, next) => {
    let {
        title,
        image,
    } = req.body;


    const newbanner = await models.Banner.create({
        title: title,
        image: image
    });


    res.status(201).json({
        success: true,
        message: "banner created succesfully",
        banner: newbanner,
    });
});

export default createBanner;
