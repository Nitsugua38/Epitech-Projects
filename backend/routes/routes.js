const express = require("express");
const router = express.Router();
const { jobs } = require("./jobs.js");
const { getRecommendedJobs } = require("../IA/recommendation.js");
const { getDataFeature } = require("../DATA/datafeature.js");
const { upload, uploadCv } = require("./cv.js");
const { login } = require("./login.js");
const { register } = require("./register.js");
const { getProfile } = require("./user.js");
const { applyJob } = require("./applied.js");
const { getFavorites, addFavorite, removeFavorite } = require("./favorites.js");

router.post("/register", register);
router.post("/login", login);
router.get("/user", getProfile);
router.post("/user/cv", upload.single("cv"), uploadCv);
router.get("/jobs", jobs);
router.post("/jobs/apply", applyJob);
router.get("/datafeature", getDataFeature);
router.get("/recommendations", getRecommendedJobs);
router.get("/favorites", getFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites/:id", removeFavorite);

module.exports = router;