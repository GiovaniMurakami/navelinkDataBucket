const express = require("express");
const router = express.Router();

const checkAuth = require("../helpers/auth").checkAuth;

const DashboardController = require("../controllers/DashboardController");

router.get("/home", checkAuth, DashboardController.home);
router.get("/create", checkAuth, DashboardController.create);
router.get("/visualize/:id", checkAuth, DashboardController.visualize);
router.post("/create", checkAuth, DashboardController.createPost);
router.post("/remove", checkAuth, DashboardController.removeData);
router.post("/edit", checkAuth, DashboardController.editData);

module.exports = router;
