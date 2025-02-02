import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../helpers/errorHandler.js";
import models from "../../../models/index.js";
import utility from "../../../utils/utility.js";

/// CREATE GROUP ///

const getAllBanners = catchAsyncError(async (req, res, next) => {
    // let {
    //     title,
    //     image,
    // } = req.body;


    const banners = await models.Banner.find();


    res.status(201).json({
        success: true,
        // message: "banner created succesfully",
        banners: banners,
    });
});

export default getAllBanners;
