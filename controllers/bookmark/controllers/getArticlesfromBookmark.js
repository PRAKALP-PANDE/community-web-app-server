import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../helpers/errorHandler.js";
import models from "../../../models/index.js";
import utility from "../../../utils/utility.js";

/// CREATE GROUP ///

const getArticlesfromBookmark = catchAsyncError(async (req, res, next) => {
    let {
        id,
    } = req.params;


    const bookmarkdata = await models.Bookmark.findOne({
        _id: id
    }).populate({
        path: "articlesList",
        populate: {
            path: "userId",
            select: "username profileimage"
        }
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
        bookmark: bookmarkdata,
    });
});

export default getArticlesfromBookmark;
