import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../helpers/errorHandler.js";
import models from "../../../models/index.js";
import utility from "../../../utils/utility.js";

/// CREATE GROUP ///

const checkArticleExistsInBookmark = catchAsyncError(async (req, res, next) => {
    try {
        const { id, articleId } = req.body;

        // Find the bookmark by ID
        const bookmarkData = await models.Bookmark.findOne({ _id: id });

        // Check if the bookmarkData is found
        if (!bookmarkData) {
            return res.status(200).json({ success: false, message: "Bookmark not found" });
        }

        // Check if the articleId exists in the articlesList array
        const articleExists = bookmarkData.articlesList.includes(articleId);

        // Include the bookmark ID in the response if the article exists
        const responseData = {
            success: true,
            articleExists,
            bookmarkId: articleExists ? bookmarkData._id : null
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error checking article in bookmark:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default checkArticleExistsInBookmark;
