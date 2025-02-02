import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../helpers/errorHandler.js";
import models from "../../../models/index.js";
import utility from "../../../utils/utility.js";

/// CREATE GROUP ///

const addArticletoBookmark = catchAsyncError(async (req, res, next) => {
    let {
        id,
        articleId,
    } = req.body;

   
    const bookmarkdata = await models.Bookmark.findOne({
        _id: id
        });

        // Check if the articleId already exists in the articlesList array
        if (bookmarkdata.articlesList.includes(articleId)) {
            // If the articleId already exists, send a response indicating that the article is already added
            return res.status(400).json({ success: false, message: ResponseMessages.ARTICLE_EXISTS_IN_BOOKMARK });
        }

        // console.log(bookmarkdata)
        bookmarkdata.articlesList.push(articleId)
        await bookmarkdata.save()
    // let user = await models.User.findById(userId);
    // user.communitylist.push(newcommunity._id);
    // await user.save();

    res.status(201).json({
        success: true,
        message: "Article added succesfully",
        // bokmark: newbookmark,
    });
});

export default addArticletoBookmark;
