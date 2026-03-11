const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;


// const express = require('express');
// const { handleGenerateShortenUrl, handleGetAnalytics, handleVisitByShortId } = require('../controllers/url');
// const router = express.Router();

// router.post('/', handleGenerateShortenUrl);
// router.get('/analytics/:shortId', handleGetAnalytics);
// router.get('/visit/:shortId', handleVisitByShortId);


// module.exports = router;