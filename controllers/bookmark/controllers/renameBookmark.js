import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import models from "../../../models/index.js";

const renameBookmark = catchAsyncError(async (req, res, next) => {
    const { bookmarkId, newBookmarkName } = req.body;

    try {
        // Find the bookmark by ID
        const bookmark = await models.Bookmark.findById(bookmarkId);

        // Check if the bookmark exists
        if (!bookmark) {
            return res.status(404).json({ success: false, message: ResponseMessages.BOOKMARK_NOT_FOUND });
        }

        // Check if the user is authorized to rename this bookmark (optional step based on your application logic)
        if (bookmark.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to rename this bookmark' });
        }

        // Update bookmark name
        const result = await models.Bookmark.updateOne({ _id: bookmarkId }, { $set: { bookmarkList_name: newBookmarkName } });
        await bookmark.save();

        res.status(200).json({
            success: true,
            message: ResponseMessages.BOOKMARK_RENAME_SUCCESS,
            bookmark: bookmark,
        });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({ success: false, message: 'An error occurred while renaming bookmark.' });
    }
});

export default renameBookmark;
