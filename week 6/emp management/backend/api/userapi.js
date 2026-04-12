import exp from 'express'
import { usermodel } from '../models/usermodel.js' 
import jwt from 'jsonwebtoken'
import { verifytoken } from '../middlewares/verifytoken.js'
import {hash,compare} from 'bcryptjs'
export const userapp=exp.Router()
const {sign} = jwt

// Get user profile
userapp.get('/profile', verifytoken, async (req, res) => {
    try {
        const user = await usermodel.findOne({ email: req.user.email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (err) {
        console.log("Error fetching profile:", err.message)
        res.status(500).json({ message: "Error fetching profile", error: err.message })
    }
})

// Update user profile
userapp.put('/profile', verifytoken, async (req, res) => {
    try {
        const { firstname, lastname, bio } = req.body
        const user = await usermodel.findOneAndUpdate(
            { email: req.user.email },
            { firstname, lastname, bio },
            { new: true }
        )
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "Profile updated successfully", user })
    } catch (err) {
        console.log("Error updating profile:", err.message)
        res.status(500).json({ message: "Error updating profile", error: err.message })
    }
})