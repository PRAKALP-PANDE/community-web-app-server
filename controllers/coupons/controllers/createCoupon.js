import catchAsyncError from "../../../helpers/catchAsyncError.js";
// import ErrorHandler from "../../../../helpers/errorHandler.js";
// import validators from "../../../../utils/validators.js";
// import utility from "../../../../utils/utility.js";
import models from "../../../models/index.js";


const createCoupon = catchAsyncError(async (req, res, next) => {

    const {
        offerAmt,
        description,
        code,
        points,
        valid_from,
        valid_to
    } = req.body

    const newcoupon = await models.Coupon.create({
        offerAmt,
        code,
        description,
        points,
        valid_from,
        valid_to
    })

    res.json(newcoupon)
});

export default createCoupon;
