const usersController = require('../controllers/users.controllers');
const router = require('express').Router();
const { validateCreateUser, validateGetUsersByEmail, validateUpdateUser, validateDeleteUser } = require("../validators/users.validators");

// POST https://prompty-4y5d.onrender.com/api/user
router.post("/", validateCreateUser, usersController.createUserController);
// GET https://prompty-4y5d.onrender.com/api/user
// https://prompty-4y5d.onrender.com/api/user?email=prueba@gmail.com
router.get("/", validateGetUsersByEmail, usersController.readUsersController);
// PUT https://prompty-4y5d.onrender.com/api/user
router.put("/", validateUpdateUser, usersController.updateUserController);
// DELETE https://prompty-4y5d.onrender.com/api/user?email=prueba2@gmail.com
router.delete("/", validateDeleteUser, usersController.deleteUserController);

router.post("/login", usersController.login);
router.post("/logout", usersController.logout);

// router.get("/recoverpassword", apiController.recoverPassword);
// router.get("/restorepassword", apiController.restorePassword);

module.exports = router;