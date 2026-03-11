const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = nanoid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    id: shortID,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};

// const { nanoid } = require("nanoid");
// const URL = require("../models/url");

// async function handleGenerateShortenUrl(req, res) {
//   const originalUrl = req.body.url;
//   if (!originalUrl) {
//     return res.status(400).json({ error: "Original URL is required" });
//   }
//   const shortId = nanoid(8);
//   await URL.create({ shortId, originalUrl, visitHistory: [], createdBy: req.user._id });
//   return res.json({ id: shortId });
// }

// const handleGetAnalytics = async (req, res) => {
//   const shortId = req.params.shortId;
//   const result = await URL.findOne({ shortId });
//   return res.json({
//     totalClicks: result.visitHistory?.length,
//     analytics: result.visitHistory,
//   });
// };

// async function handleVisitByShortId(req, res) {
//   const shortId = req.params.shortId;
//   const entryUrl = await URL.findOneAndUpdate(
//     { shortId },
//     {
//       $push: {
//         visitHistory: { timestamp: new Date() },
//       },
//     }
//   );
//   if (!entryUrl) {
//     return res.status(404).json({ error: "Short URL not found" });
//   }
//   res.redirect(entryUrl.originalUrl);
// }

// module.exports = {
//   handleGenerateShortenUrl,
//   handleGetAnalytics,
//   handleVisitByShortId,
// };
