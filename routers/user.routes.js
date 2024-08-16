import { Router } from "express";
import { checkMail } from "../middlewares/checkMail.js";
import { signin, signup, updateUser, verifyOtp } from "../controllers/user.controller.js";
import { verifyToken } from "../controllers/verifyToken.js";
import { isValid } from "../validation/validation.js";
import { signinVal, signupVal } from "../validation/user.validation.js";
const userRouter = Router()
userRouter.route('/signup').post(checkMail,signup)
userRouter.route('/signin').post(isValid(signinVal),signin)
userRouter.route('/verifyOtp').post(verifyOtp)
userRouter.route('/:id').patch(verifyToken,updateUser)
export default userRouter
