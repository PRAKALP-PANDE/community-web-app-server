import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../helpers/errorHandler.js";
import models from "../../../models/index.js";
import utility from "../../../utils/utility.js";

/// CREATE GROUP ///

const deleteBookmark = catchAsyncError(async (req, res, next) => {
    let {
        id,
    } = req.params;

   
     await models.Bookmark.findOneAndDelete({
        _id: id
        });
        
    res.status(201).json({
        success: true,
        message: "Bookmark deleted succesfully",
        // bookmark: bookmarkdata,
    });
});

export default deleteBookmark;
