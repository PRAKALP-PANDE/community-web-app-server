import catchAsyncError from "../../../helpers/catchAsyncError.js";
// import ErrorHandler from "../../../../helpers/errorHandler.js";
// import validators from "../../../../utils/validators.js";
// import utility from "../../../../utils/utility.js";
import models from "../../../models/index.js";


const getAllCoupons = catchAsyncError(async (req, res, next) => {

    const coupons = await models.Coupon.find();

    const redeemed = await models.CouponRedeemed.find();

    let resdata = []
    coupons.forEach((coupon) => {
        // let cnt = 0;
        // let avg = 0;
        let redeemstatus = false;
        redeemed.forEach((redeem) => {
            if (redeem.userId.equals(req.user._id) && redeem.couponId.equals(coupon._id)) {
                //this means the coupon was already redeemed by user
                redeemstatus = true;
            }
        })

        resdata.push({
            coupon: coupon,
            alreadyRedeemed: redeemstatus
        })
    });

    res.json(resdata)

});

export default getAllCoupons;
