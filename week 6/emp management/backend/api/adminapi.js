import exp from 'express'
import { verifytoken } from '../middlewares/verifytoken.js'

export const adminapp = exp.Router()

// Get admin profile
adminapp.get('/profile', verifytoken, async (req, res) => {
    try {
        const { usermodel } = await import('../models/usermodel.js')
        const admin = await usermodel.findOne({ email: req.user.email })
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" })
        }
        res.status(200).json(admin)
    } catch (err) {
        console.log("Error fetching admin profile:", err.message)
        res.status(500).json({ message: "Error fetching admin profile", error: err.message })
    }
})

// Get all users
adminapp.get('/users', verifytoken, async (req, res) => {
    try {
        const { usermodel } = await import('../models/usermodel.js')
        const users = await usermodel.find({ role: 'user' }).select('-password')
        res.status(200).json({ users })
    } catch (err) {
        console.log("Error fetching users:", err.message)
        res.status(500).json({ message: "Error fetching users", error: err.message })
    }
})

// Get all authors
adminapp.get('/authors', verifytoken, async (req, res) => {
    try {
        const { usermodel } = await import('../models/usermodel.js')
        const { articlemodel } = await import('../models/articlemodel.js')
        
        const authors = await usermodel.find({ role: 'author' }).select('-password')
        
        // Get article count for each author
        const authorsWithCount = await Promise.all(
            authors.map(async (author) => {
                const articleCount = await articlemodel.countDocuments({ authorEmail: author.email })
                return {
                    ...author.toObject(),
                    articleCount
                }
            })
        )
        
        res.status(200).json({ authors: authorsWithCount })
    } catch (err) {
        console.log("Error fetching authors:", err.message)
        res.status(500).json({ message: "Error fetching authors", error: err.message })
    }
})

// Delete user
adminapp.delete('/users/:id', verifytoken, async (req, res) => {
    try {
        const { usermodel } = await import('../models/usermodel.js')
        const { id } = req.params
        
        const user = await usermodel.findByIdAndDelete(id)
        
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        
        res.status(200).json({ message: "User deleted successfully" })
    } catch (err) {
        console.log("Error deleting user:", err.message)
        res.status(500).json({ message: "Error deleting user", error: err.message })
    }
})

// Delete author
adminapp.delete('/authors/:id', verifytoken, async (req, res) => {
    try {
        const { usermodel } = await import('../models/usermodel.js')
        const { articlemodel } = await import('../models/articlemodel.js')
        const { id } = req.params
        
        const author = await usermodel.findByIdAndDelete(id)
        
        if (!author) {
            return res.status(404).json({ message: "Author not found" })
        }
        
        // Delete all articles by this author
        await articlemodel.deleteMany({ authorEmail: author.email })
        
        res.status(200).json({ message: "Author and their articles deleted successfully" })
    } catch (err) {
        console.log("Error deleting author:", err.message)
        res.status(500).json({ message: "Error deleting author", error: err.message })
    }
})