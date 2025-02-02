import addArticletoBookmark from "./addArticletoBookmark.js";
import checkArticleExistsInBookmark from "./checkArticleinBookmark.js";
import createBookmark from "./createBookmark.js";
import deleteArticlefromBookmark from "./deleteArticlefromBookmark.js";
import deleteBookmark from "./deleteBookmark.js";
import getAllBookmarks from "./getAllBookmarks.js";
import getArticlesfromBookmark from "./getArticlesfromBookmark.js";
import renameBookmark from "./renameBookmark.js";


const bookmarkController = {};

bookmarkController.createBookmark = createBookmark;
bookmarkController.renameBookmark = renameBookmark;
bookmarkController.addArticletoBookmark = addArticletoBookmark;
bookmarkController.deleteArticlefromBookmark = deleteArticlefromBookmark;
bookmarkController.getArticlesfromBookmark = getArticlesfromBookmark;
bookmarkController.getAllBookmarks = getAllBookmarks
bookmarkController.deleteBookmark = deleteBookmark
bookmarkController.checkArticleExistsInBookmark = checkArticleExistsInBookmark
// groupController.getGroups = getGroups;
// groupController.searchGroup = searchGroup;
// groupController.getAllGroups = getAllGroups;
// groupController.deleteGroup = deleteGroup;
// groupController.getGroupDetails = getGroupDetails;
// groupController.addToGroups = addToGroups;
// communityController.followUnfollowCommunity = followUnfollowCommunity;
// communityController.getTopCommunities = getTopCommunities
// groupController.getPostsByUserGroups = getPostsByUserGroups;
// groupController.getStoriesByUserGroups = getStoriesByUserGroups;

export default bookmarkController;
