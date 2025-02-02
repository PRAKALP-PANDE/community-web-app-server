import { Router } from "express";
import authMiddleware from "../../../middlewares/auth.js";
import bookmarkController from "../controllers/index.js";

const bookmarkRouter = Router();

const isAuthenticatedUser = authMiddleware.isAuthenticatedUser;

// Authenticated Routes -------------------------------------------------------

bookmarkRouter
  .route("/create-bookmark")
  .post(
    isAuthenticatedUser,
    bookmarkController.createBookmark
  );

bookmarkRouter
  .route("/rename-bookmark")
  .post(
    isAuthenticatedUser,
    bookmarkController.renameBookmark
  );

bookmarkRouter
  .route("/add-article")
  .put(
    isAuthenticatedUser,
    bookmarkController.addArticletoBookmark
  );

bookmarkRouter
  .route("/delete-article")
  .put(
    isAuthenticatedUser,
    bookmarkController.deleteArticlefromBookmark
  );

bookmarkRouter
  .route("/delete-bookmark/:id")
  .delete(
    isAuthenticatedUser,
    bookmarkController.deleteBookmark
  );

bookmarkRouter
  .route("/get-bookmark-bybookid/:id")
  .get(
    isAuthenticatedUser,
    bookmarkController.getArticlesfromBookmark
  );

bookmarkRouter
  .route("/get-all-bookmarks")
  .get(
    isAuthenticatedUser,
    bookmarkController.getAllBookmarks
  );

bookmarkRouter
  .route("/check-article-in-bookmark")
  .post(
    isAuthenticatedUser,
    bookmarkController.checkArticleExistsInBookmark
  );


// communityRouter
//   .route("/get-top-communities")
//   .get(
//     isAuthenticatedUser,
//     communityController.getTopCommunities
//   );


export default bookmarkRouter;
