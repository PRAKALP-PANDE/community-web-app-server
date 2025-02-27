import { Router } from "express";
import authMiddleware from "../../../middlewares/auth.js";
import communityController from "../controllers/index.js";

const communityRouter = Router();

const isAuthenticatedUser = authMiddleware.isAuthenticatedUser;

// Authenticated Routes -------------------------------------------------------

communityRouter
  .route("/create-community")
  .post(
    isAuthenticatedUser,
    communityController.createCommunity
  );

communityRouter
  .route("/edit-community-followers")
  .put(
    isAuthenticatedUser,
    communityController.followUnfollowCommunity
  );

communityRouter
  .route("/get-top-communities")
  .get(
    isAuthenticatedUser,
    communityController.getTopCommunities
  );

communityRouter
  .route("/search-communities")
  .get(
    isAuthenticatedUser,
    communityController.searchGroup
  );

communityRouter
  .route("/get-community-details")
  .get(
    isAuthenticatedUser,
    communityController.getGroupDetails
  );

communityRouter
  .route("/get-community-posts")
  .get(
    isAuthenticatedUser,
    communityController.getPostsByUserGroups
  );

communityRouter
  .route("/check-community-follow/:communityId")
  .get(
    isAuthenticatedUser,
    communityController.checkFollowCommunity
  );


export default communityRouter;
