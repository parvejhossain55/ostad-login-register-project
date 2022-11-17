const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/registration", UserController.RegisterController);
router.post("/login", UserController.LoginController);
router.post("/changepass", UserController.ChangePasswordController);

module.exports = router;
