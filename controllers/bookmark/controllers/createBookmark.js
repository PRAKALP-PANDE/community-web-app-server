import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../helpers/errorHandler.js";
import models from "../../../models/index.js";
import utility from "../../../utils/utility.js";

/// CREATE GROUP ///

const createBookmark = catchAsyncError(async (req, res, next) => {
    // Fetch the count of existing bookmarks for the current user
    const existingBookmarkCount = await models.Bookmark.countDocuments({ owner: req.user._id });

    // Check if the count is less than 15
    if (existingBookmarkCount >= 15) {
        return res.status(400).json({ success: false, message: ResponseMessages.BOOKMARK_LIMIT_EXCEED });
    }

    let {
        // owner,
        bookmarkList_name,
    } = req.body;

    const owner = req.user._id

    const newbookmark = await models.Bookmark.create({
        owner: owner,
        bookmarkList_name: bookmarkList_name
    });


    // let user = await models.User.findById(userId);
    // user.communitylist.push(newcommunity._id);
    // await user.save();

    res.status(201).json({
        success: true,
        message: ResponseMessages.GROUP_CREATE_SUCCESS,
        bokmark: newbookmark,
    });
});

export default createBookmark;
