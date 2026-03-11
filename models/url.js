const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;


// const Mongoose = require('mongoose');

// const urlSchema = new Mongoose.Schema({
//     shortId: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     originalUrl: {
//         type: String,
//         required: true
//     },
//     visitHistory: [
//         {
//             timestamp: {
//                 type: Date,
//                 default: Date.now
//             },
//             // userAgent: String,
//             // ipAddress: String
//         }
//     ],
//     createdBy:{
//         type: Mongoose.Schema.Types.ObjectId,
//         ref: 'users',
//     }
// }, {timestamps : true});

// const Url = Mongoose.model('url', urlSchema);

// module.exports = Url;