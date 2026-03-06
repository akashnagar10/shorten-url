const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateShortenUrl(req, res) {
  const originalUrl = req.body.url;
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }
  const shortId = nanoid(8);
  await URL.create({ shortId, originalUrl, visitHistory: [] });
  return res.json({ id: shortId });
}

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory?.length,
    analytics: result.visitHistory,
  });
};

async function handleVisitByShortId(req, res) {
  const shortId = req.params.shortId;
  const entryUrl = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: new Date() },
      },
    }
  );
  if (!entryUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  res.redirect(entryUrl.originalUrl);
}

module.exports = {
  handleGenerateShortenUrl,
  handleGetAnalytics,
  handleVisitByShortId,
};
