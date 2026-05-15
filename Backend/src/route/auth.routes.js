const {Router} = require('express')

const authController = require ("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router();


authRouter.post("/register", authController.registerUserController)



/**
 * @route POST /api/auth/login
 * @description login a user,expects email and password in the request body
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route POST /api/auth/logout
 * @description clear the token cookie to logout a user
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserController)
 

/**
 * @route GET /api/auth/get-me
 * @description get the details of the logged in user,
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser,authController.getMeController) 


module.exports = authRouter;
