import createGroup from "./community/createCommunity.js";
import getGroups from "./community/getGroups.js";
import deleteGroup from "./community/deleteGroup.js";
import getGroupDetails from "./community/getGroupDetails.js";
import addToGroups from "./community/addToGroups.js";
import getAllGroups from "./community/getAllGroups.js";
import searchGroup from "./community/searchGroup.js";
import getPostsByUserGroups from "./community/getPostsByUserGroups.js";
import getStoriesByUserGroups from "./community/getStoriesByUserGroup.js";
import createCommunity from "./community/createCommunity.js";
import followUnfollowCommunity from "./community/followUnfollowCommunity.js";
import getTopCommunities from "./community/getTopCommunities.js";
import checkFollowCommunity from "./community/checkFollowCommunity.js";

const communityController = {};

communityController.createCommunity = createCommunity;
// groupController.getGroups = getGroups;
communityController.searchGroup = searchGroup;
// groupController.getAllGroups = getAllGroups;
// groupController.deleteGroup = deleteGroup;
communityController.getGroupDetails = getGroupDetails;
// groupController.addToGroups = addToGroups;
communityController.followUnfollowCommunity = followUnfollowCommunity;
communityController.getTopCommunities = getTopCommunities
communityController.getPostsByUserGroups = getPostsByUserGroups;
// groupController.getStoriesByUserGroups = getStoriesByUserGroups;
communityController.checkFollowCommunity = checkFollowCommunity;

export default communityController;
