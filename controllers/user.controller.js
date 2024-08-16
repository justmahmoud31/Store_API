//signup 
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Op, where } from "sequelize";
import { catchError } from "../middlewares/catchError.js";
import User from "../Models/user.js";
import { sendEmail } from '../email/sendMail.js';
import { AppError } from '../middlewares/appError.js';
export const signup = catchError(async (req, res, next) => {
    const user = await User.create({ userName: req.body.userName, email: req.body.email, password: req.body.password })
    console.log(req.body.password, 'form  signup');
    user.password = undefined
    sendEmail(req.body.email)
    if (!user)
        return next(new AppError('fail to create user'))

    res.status(201).json({ messgae: 'sign up sucessfully..', user, password: req.body.password });
})
export const verifyOtp = catchError(async (req, res, next) => {
    const find = await User.findOne({
        where: {
            [Op.and]: [{ email: req.body.email },
            { otp: req.body.otp }
            ]
        }
    })
    if (!find)
        return next(new AppError('invalid Otp or mail', 404))
    if (new Date() > find.otpExp) {
        return next(new AppError('otp expired'))
    }
    find.confirmedMail = true;
    await find.save()
    res.json({ message: 'email verified successfully...' })
})
export const signin = catchError(async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user || !bcrypt.compareSync(req.body.password, user.password))
        return next(new AppError('email or password  not valid', 401))
    jwt.sign({ _id: user._id, email: user.email, password: user.password, role: user.role, username: user.username }, 'SectectKey', async (err, token) => {
        res.json({ message: 'loged in sucessfully', token })
    })

})
export const updateUser = async (req, res, next) => {
    //check user role
    if (req.user.role != 'admin')
        return next(new AppError('you must be admin'))

    //get data from req
    const { email } = req.body;
    let user = await User.findOne({ where: { email: email, role: 'user' } })
    if (!user)
        return next(new AppError('this user not found'), 409)

    user.role = 'supervisor'
    const updatedUser = await user.save()
    if (!updatedUser)
        return next(new AppError('can not save updated user on Db'))

    res.json({ message: 'sucess to update', updatedUser })
}

export const deleteAccount = catchError(async (req, res, next) => {

    const user = await User.findOne({ where: { email: req.user.email } })
    if (!user)
        return next(new AppError('this account not found '))
    await User.findByIdAndDelete({ where: { email: user.email } })
    res.json({ message: 'deleted successfully', user })
})