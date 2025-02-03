import Vendor from "../models/vendor/Vendor.js";

export default async function calculateRanks() {
    try {
        console.log("updating ranks")
        // const pipeline = [
        //     {
        //         $sort: { ratingsCount: -1 }, // Sort stores by ratingsCount in descending order
        //     },
        //     {
        //         $group: {
        //             _id: "kumar singh",
        //             stores: { $push: '$$ROOT' }, // Create an array of stores
        //             // ids: { $push: '$_id' }
        //         },
        //     },
        //     // {
        //     //     $unwind: '$stores', // Unwind the array
        //     // },
        //     {
        //         $set: {

        //             'stores.rank': { $sum: [1, { $indexOfArray: ['$stores.fullname', '$ids._id'] }] }, // Calculate rank

        //         },
        //     },
        //     // {
        //     //     $merge: 'stores', // Update the stores collection with the new rank field
        //     // },
        // ];

        // const pipeline = [
        //     {
        //         $sort: { ratingsCount: -1 }, // Sort stores by ratingsCount in descending order
        //     },
        //     {
        //         $group: {
        //             _id: "_id",
        //             stores: { $push: '$$ROOT' }, // Create an array of stores
        //         },
        //     },
        //     // {
        //     //     $unwind: '$stores', // Unwind the array
        //     // },
        //     {
        //         $set: {

        //             'stores.rank': { $sum: [1, { $indexOfArray: ['$stores._id', '$_id'] }] }, // Calculate rank

        //         },
        //     },
        //     // {
        //     //     $merge: 'stores', // Update the stores collection with the new rank field
        //     // },
        // ];

        // const pipeline = [
        //     {
        //         $sort: { ratingsCount: -1 }, // Sort stores by ratingsCount in descending order
        //     },
        //     {
        //         $group: {
        //             _id: null,
        //             stores: { $push: '$$ROOT' }, // Create an array of stores
        //         },
        //     },
        //     {
        //         $unwind: '$stores', // Unwind the array
        //     },
        //     {
        //         $set: {
        //             'stores.rank': { $sum: [1, { $indexOfArray: ['$stores._id', '$stores._id'] }] }, // Calculate rank
        //         },
        //     },
        //     //   {
        //     //     $merge: 'stores', // Update the stores collection with the new rank field
        //     //   },
        // ];

        // const pipeline = [
        //     {
        //         $sort: { ratingsCount: -1 }, // Sort vendors by ratingsCount in descending order
        //     },
        //     {
        //         $group: {
        //             _id: null,
        //             vendors: { $push: '$rank' }, // Create an array of stores
        //         },

        //     },
        //     {
        //         $unwind: '$vendors', // Unwind the array
        //     },
        //     {
        //         $set: {
        //             'vendors.rank': { $sum: [1, { $indexOfArray: ['$vendors', '$_id'] }] }, // Calculate rank
        //         },
        //     },



        // ];

        const pipeline = [
            {
                $sort: { ratingsCount: -1 }, // Sort stores by ratingsCount in descending order
            },
            {
                $group: {
                    _id: null,
                    stores: { $push: '$$ROOT' }, // Create an array of stores
                },
            },
            {
                $addFields: {
                    stores: {
                        $map: {
                            input: '$stores',
                            as: 'store',
                            in: {
                                $mergeObjects: [
                                    '$$store',
                                    {
                                        rank: {
                                            $add: [{ $indexOfArray: ['$stores', '$$store'] }, 1],
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
            {
                $unwind: '$stores', // Unwind the array
            },
            // {
            //     $project: {
            //         _id: 0, // Exclude _id field from the output
            //         stores: 1, // Include the stores array with the calculated rank
            //     },
            // },
            {
                $replaceRoot: { newRoot: '$stores' }, // Replace the root document with the stores
            },
            {
                $out: 'vendors', // Update the 'vendors' collection with the modified documents
            }
        ]




        const res = await Vendor.aggregate(pipeline);
        console.log("Succesfully updated ranks in db");

    } catch (error) {
        console.error('Error calculating ranks:', error);
    }
}




// const Store = require('./models/store'); // Import your Mongoose model

// async function calculateRanks() {
//   try {
// const pipeline = [
//   {
//     $sort: { ratingsCount: -1 }, // Sort stores by ratingsCount in descending order
//   },
//   {
//     $group: {
//       _id: null,
//       stores: { $push: '$$ROOT' }, // Create an array of stores
//     },
//   },
//   {
//     $unwind: '$stores', // Unwind the array
//   },
//   {
//     $set: {
//       'stores.rank': { $sum: [1, { $indexOfArray: ['$stores._id', '$_id'] }] }, // Calculate rank
//     },
//   },
//   {
//     $merge: 'stores', // Update the stores collection with the new rank field
//   },
// ];

//     await Store.aggregate(pipeline);
//     console.log('Ranks calculated and updated successfully.');
//   } catch (error) {
//     console.error('Error calculating ranks:', error);
//   }
// }

// calculateRanks();

// ---------------------------------------------------
// try if this works. @Rushikesh Susar SearchIN pls review