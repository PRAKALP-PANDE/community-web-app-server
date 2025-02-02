import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../helpers/errorHandler.js";
import models from "../../../models/index.js";
import utility from "../../../utils/utility.js";

/// CREATE GROUP ///

const deleteArticlefromBookmark = catchAsyncError(async (req, res, next) => {
    let {
        bookmarkid,
        articleId,
    } = req.body;

   
    const bookmarkdata = await models.Bookmark.findOne({
        _id: bookmarkid
        });
        // console.log(bookmarkdata)
        bookmarkdata.articlesList.pull(articleId)
        await bookmarkdata.save()
    // let user = await models.User.findById(userId);
    // user.communitylist.push(newcommunity._id);
    // await user.save();

    res.status(201).json({
        success: true,
        message: "Article removed succesfully",
        // bokmark: newbookmark,
    });
});

export default deleteArticlefromBookmark;
