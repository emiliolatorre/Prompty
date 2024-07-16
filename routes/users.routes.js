const usersController = require('../controllers/users.controllers');
const router = require('express').Router();
const { validateCreateUser, validateGetUsersByEmail, validateUpdateUser, validateDeleteUser } = require("../validators/users.validators");

// POST http://localhost:3000/api/user
router.post("/", validateCreateUser, usersController.createUserController);
// GET http://localhost:3000/api/user
// http://localhost:3000/api/user?email=prueba@gmail.com
router.get("/", validateGetUsersByEmail, usersController.readUsersController);
// PUT http://localhost:3000/api/user
router.put("/", validateUpdateUser, usersController.updateUserController);
// DELETE http://localhost:3000/api/user?email=prueba2@gmail.com
router.delete("/", validateDeleteUser, usersController.deleteUserController);

router.post("/login", usersController.login);
router.post("/logout", usersController.logout);

// router.get("/recoverpassword", apiController.recoverPassword);
// router.get("/restorepassword", apiController.restorePassword);

module.exports = router;