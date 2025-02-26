// import ResponseMessages from "../../../../constants/responseMessages.js";
import catchAsyncError from "../../../helpers/catchAsyncError.js";
// import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../models/index.js";

/// @route GET /api/v1/search-group

const searchCoupons = catchAsyncError(async (req, res, next) => {

  const { code } = req.query
  if (code !== "") {
    const result = await models.Coupon.find({
      "code": { "$regex": code, "$options": "i" }
    })
    res.send(result)
  }
  else {
    // console.log('empty req' + q)
    // try {
    res.json()
    // } catch (error) {
    // res.status(500).json({ message: 'Internal Server Errorexpected' })
    // }
  }


});

export default searchCoupons;
