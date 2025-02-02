import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../helpers/errorHandler.js";
import models from "../../../models/index.js";
import utility from "../../../utils/utility.js";

/// CREATE GROUP ///

const getAllBookmarks = catchAsyncError(async (req, res, next) => {
    // let {
    //     owner,
    // } = req.params;
    const owner = req.user._id

    const bookmarks = await models.Bookmark.find({
        owner: owner
    });
    // console.log(bookmarkdata)
    // bookmarkdata.articlesList.push(articleId)
    // await bookmarkdata.save()
    // let user = await models.User.findById(userId);
    // user.communitylist.push(newcommunity._id);
    // await user.save();

    res.status(201).json({
        success: true,
        // message: "Article added succesfully",
        bookmarks: bookmarks,
    });
});

export default getAllBookmarks;
