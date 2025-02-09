import ResponseMessages from "../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../helpers/errorHandler.js";
import models from "../../../models/index.js";
import utility from "../../../utils/utility.js";
import mongoose from "mongoose";

const getNotifications = catchAsyncError(async (req, res, next) => {
  // const { userId } = req.params;
  const userId  = req.user._id;

  if (!userId) {
    return next(new ErrorHandler(ResponseMessages.USER_NOT_FOUND, 404));
  }

  // let currentPage = parseInt(req.query.page) || 1;
  // let limit = parseInt(req.query.limit) || ResponseMessages.NUMBER_OF_PAGES;

  let totalNotifications = await models.Notification.find({
    to: userId
  })

  // let resdata = []
  // totalNotifications.forEach(async (notif) => {
  //   // console.log("inside")
  //   let temp;
  //   let objectId = mongoose.Types.ObjectId(notif.refId);
  //   if (notif.type === "follow" || notif.type === "postComment") {
  //     // console.log(objectId)
  //     temp = await models.User.findById(notif.refId)
  //     console.log(temp)
  //   }
  //   else {
  //     temp = await models.Article.findOne({ _id: notif.refId })
  //   }

  //   resdata.push({
  //     notification: notif,
  //     data: temp
  //   })
  // })
  // let totalPages = Math.ceil(totalNotifications / limit);

  // if (totalPages <= 0) {
  //   totalPages = 1;
  // }

  // if (currentPage <= 1) {
  //   currentPage = 1;
  // }

  // if (totalPages > 1 && currentPage > totalPages) {
  //   currentPage = totalPages;
  // }
  console.log("outside")

  // let skip = (currentPage - 1) * limit;

  // let prevPageIndex = null;
  // let hasPrevPage = false;
  // let prevPage = null;
  // let nextPageIndex = null;
  // let hasNextPage = false;
  // let nextPage = null;

  // if (currentPage < totalPages) {
  //   nextPageIndex = currentPage + 1;
  //   hasNextPage = true;
  // }

  // if (currentPage > 1) {
  //   prevPageIndex = currentPage - 1;
  //   hasPrevPage = true;
  // }

  // const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl
  //   }`.split("?")[0];

  // if (hasPrevPage) {
  //   prevPage = `${baseUrl}?page=${prevPageIndex}&limit=${limit}`;
  // }

  // if (hasNextPage) {
  //   nextPage = `${baseUrl}?page=${nextPageIndex}&limit=${limit}`;
  // }

  // const slicedNotifications = await models.Notification.find({
  //   to: userId
  // })
  //   .select("_id")
  //   .skip(skip)
  //   .limit(limit)
  //   .sort({ createdAt: -1 });

  // const results = [];

  // for (let notification of slicedNotifications) {

  //   const notificationData = await utility.getNotificationData(notification._id, req.user);

  //   results.push(notificationData);
  // }

  res.status(200).json({
    success: true,
    notifications: totalNotifications
    // currentPage,
    // totalPages,
    // limit,
    // hasPrevPage,
    // prevPage,
    // hasNextPage,
    // nextPage,
    // results,
  });
});

export default getNotifications;
