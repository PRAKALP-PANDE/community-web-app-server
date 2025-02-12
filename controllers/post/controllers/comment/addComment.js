import ResponseMessages from "../../../../constants/responseMessages.js";
import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import utility from "../../../../utils/utility.js";
import { sendNotification } from "../../../../firebase/index.js";

/// @route POST  /api/v1/add-comment

const addComment = catchAsyncError(async (req, res, next) => {
  const {
    parentCommentId,
    articleId,
    // userId,
    content,
  } = req.body;

  // const id = postId || req.query.postId;

  if (!articleId) {
    return next(new ErrorHandler(ResponseMessages.POST_ID_REQUIRED, 400));
  }

  if (!content) {
    return next(new ErrorHandler(ResponseMessages.COMMENT_REQUIRED, 400));
  }

  const post = await models.Article.findById(articleId)

  if (!post) {
    return next(new ErrorHandler(ResponseMessages.POST_NOT_FOUND, 404));
  }
  let userId = req.user._id
  const newComment = await models.Comment.create({
    parentCommentId,
    articleId,
    userId,
    content,
  });

  post.commentsCount++;
  await post.save();


  let noti = await models.Notification.create({
    to: post.userId,
    from: userId,
    body: "Commented on Your Post",
    refId: post._id,
    type: "postComment",
  });

  // let mentions = utility.getMentions(comment);

  // if (mentions.length > 0) {
  //   for (let i = 0; i < mentions.length; i++) {
  //     const mentionedUser = await models.User.findOne({ uname: mentions[i] })
  //       .select(["_id", "uname"]);

  //     const isPostOwner = await utility.checkIfPostOwner(post._id, mentionedUser);

  //     if (mentionedUser && !isPostOwner) {
  //       const mentionNotif = await models.Notification.create({
  //         to: mentionedUser._id,
  //         from: req.user._id,
  //         refId: newComment._id,
  //         body: `mentioned you in a comment.`,
  //         type: "commentMention"
  //       });

  //       const notificationData = await utility
  //         .getNotificationData(mentionNotif._id, req.user);

  //       const fcmToken = await models.FcmToken.findOne({ user: mentionedUser._id })
  //         .select("token");

  //       if (fcmToken) {
  //         await sendNotification(
  //           fcmToken.token,
  //           {
  //             title: "New Mention",
  //             body: `${notificationData.from.uname} mentioned you in a comment.`,
  //             type: "Mentions",
  //           }
  //         );
  //       }
  //     }
  //   }
  // }

  // if (post.owner.toString() !== req.user._id.toString()) {
  //   const noti = await models.Notification.create({
  //     to: post.owner,
  //     from: req.user._id,
  //     body: "commented on your post.",
  //     refId: post._id,
  //     type: "postComment",
  //   });

  //   const notificationData = await utility.getNotificationData(noti._id, req.user);

  //   const fcmToken = await models.FcmToken.findOne({ user: post.owner })
  //     .select("token");

  //   if (fcmToken) {
  //     await sendNotification(
  //       fcmToken.token,
  //       {
  //         title: "New Comment",
  //         body: `${notificationData.from.uname} commented on your post.`,
  //         type: "Comments",
  //       }
  //     );
  //   }
  // }

  // const commentData = await utility.getCommentData(newComment._id, req.user);

  res.status(200).json({
    success: true,
    message: ResponseMessages.COMMENT_ADD_SUCCESS,
    comment: newComment,
  });
});

export default addComment;
