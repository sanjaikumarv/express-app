import bcrypt from "bcrypt"
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import userModel from "../../models/user.model";
import { jwtExpiry, jwtSecret } from "../../config/env";
import { getJWTExpiry } from "../../utils/functions";


export async function createUser(req: Request, res: Response) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const existingUser = await userModel.findOne({ email: req.body.email })

    if (existingUser) {
        return res.status(409).json({ message: "User allready exist" })
    }
    const user = new userModel()
    user.name = req.body.name
    user.email = req.body.email
    user.phone = req.body.phone
    user.password = hash

    const createdUser = await user.save()
    res.json(createdUser)
}

export async function login(req: Request, res: Response) {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    const passCompare = await bcrypt.compare(req.body.password, user.password)

    if (!passCompare) {
        return res.status(400).json({ message: "Password is wrong" })
    }
    const tokenDetail = {
        name: user.name,
        email: user.email,
    }

    const authToken = jwt.sign(tokenDetail, jwtSecret, {
        expiresIn: jwtExpiry,
    })
    user.authToken = authToken
    await user.save()

    res.cookie("authToken", authToken, {
        maxAge: 10 * 60 * 1000,
        httpOnly: true,
        sameSite: false,
    })

    return res.json({
        message: "Loggin success",
        token: authToken,
        expiry: getJWTExpiry(authToken)
    })

}

export async function getUser(req: Request, res: Response) {
    const user = await userModel.find()
    res.json(user)
}

export async function logout(req: Request, res: Response) {
    const token = req.cookies.authToken

    const user = await userModel.findOne({ authToken: token })
    if (!user) {
        res.clearCookie("authToken", {
            httpOnly: true,
            sameSite: false,
            secure: true,
        })
        return res.status(200).json({ message: "User loggedout" })
    }
    user.authToken = ""
    await user.save()
    res.clearCookie("authToken", {
        httpOnly: true,
        sameSite: false,
        secure: true,
    })
    res.status(200).json({ message: "User loggedout success" })
}