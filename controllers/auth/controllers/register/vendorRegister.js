import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import utility from "../../../../utils/utility.js";
import validators from "../../../../utils/validators.js";
import ResponseMessages from "../../../../constants/responseMessages.js";

/// @route  POST /api/v1/vendor-register

const vendorRegister = catchAsyncError(async (req, res, next) => {
    let {
        // email,
        phone,
        fullname,
        pincode,
        state,
        city,
        address,
        storename,
        availablePeriod,
        storeDetails,
        gstNumber,
        locationURL,
        image,
        // password,
        // country,
        // username,
        // bio,
        // profileimage,
        // interestedarea,
        // uname,
        // type,
        // confirmPassword,
    } = req.body;

    // make a check here to see if old user if so return something that tells that he is old user 
    // so that flutter can redirect to home directly else u return something that tells them user is new 
    //in case of new then they can redirect to flutter details user page and then on submitting this same api is called

    let user = await models.Vendor.findOne({ phone });

    if (!fullname) {
        // console.log("yes")
        if (user) {
            //user is logging in so create the auth token, place it in db and pass it in response

            const tokenObj = await utility.generateAuthToken(user, "vendor");
            const ratings = await models.Rating.find();

            let resdata = []
            let cnt = 0;
            let avg = 0;
            ratings.forEach((rating) => {
                if (rating.vendorId.equals(user._id)) {
                    //this means the rating was given for current store
                    cnt++;
                    avg += rating.rating
                }
            })

            //u have the total no. of ratings for curr store and the sum of all so u get avg now
            if (cnt !== 0) avg /= cnt;

            resdata.push({
                vendor: user,
                average: avg,
                // total: cnt
            })


            return res.json({
                "newuser": false, "user": resdata, "token": tokenObj.token,

            }, 200);
        }
        else {
            return res.json({ "newuser": true }, 200);
        }
    }


    if (!fullname) {
        return next(new ErrorHandler(ResponseMessages.FIRST_NAME_REQUIRED, 400));
    }

    if (fullname && !validators.validateName(fullname)) {
        return next(new ErrorHandler(ResponseMessages.INVALID_FIRST_NAME, 400));
    }


    if (!phone) {
        return next(new ErrorHandler(ResponseMessages.PHONE_REQUIRED, 400));
    }

    if (phone && !validators.validatePhone(phone)) {
        return next(new ErrorHandler(ResponseMessages.INVALID_PHONE, 400));
    }


    const totallength = await models.Vendor.find();

    const vendornew = await models.Vendor.create({

        phone,
        fullname,
        pincode,
        state,
        city,
        address,
        storename,
        availablePeriod,
        storeDetails,
        gstNumber,
        locationURL,
        image,
        rank: totallength.length + 1
    });

    if (!vendornew) {
        // console.log("yes")
        return next(new ErrorHandler(ResponseMessages.ACCOUNT_NOT_CREATED, 500));
    }


    const tokenObj = await utility.generateAuthToken(vendornew, "vendor");

    res.status(201).json({
        success: true,
        message: ResponseMessages.SIGNUP_SUCCESS,
        data: {
            vendornew: vendornew._id,
            "token": tokenObj.token,
            average: 0,
            total: 0
            // otp: otp,
        }
    });
});

export default vendorRegister;
