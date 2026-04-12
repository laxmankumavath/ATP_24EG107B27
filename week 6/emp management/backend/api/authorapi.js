import exp from 'express'
import { verifytoken } from '../middlewares/verifytoken.js'

export const authorapp = exp.Router()

// Get author profile
authorapp.get('/profile', verifytoken, async (req, res) => {
    try {
        const { usermodel } = await import('../models/usermodel.js')
        const author = await usermodel.findOne({ email: req.user.email })
        if (!author) {
            return res.status(404).json({ message: "Author not found" })
        }
        res.status(200).json(author)
    } catch (err) {
        console.log("Error fetching author profile:", err.message)
        res.status(500).json({ message: "Error fetching author profile", error: err.message })
    }
})

// Create article
authorapp.post('/articles', verifytoken, async (req, res) => {
    try {
        const { articlemodel } = await import('../models/articlemodel.js')
        const { title, content, category, tags } = req.body
        
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" })
        }
        
        const newArticle = new articlemodel({
            title,
            content,
            category,
            tags: Array.isArray(tags) ? tags : [tags],
            authorEmail: req.user.email,
            createdAt: new Date()
        })
        
        await newArticle.save()
        res.status(201).json({ message: "Article created successfully", article: newArticle })
    } catch (err) {
        console.log("Error creating article:", err.message)
        res.status(500).json({ message: "Error creating article", error: err.message })
    }
})

// Get author's articles
authorapp.get('/articles', verifytoken, async (req, res) => {
    try {
        const { articlemodel } = await import('../models/articlemodel.js')
        const articles = await articlemodel.find({ authorEmail: req.user.email })
        res.status(200).json({ articles })
    } catch (err) {
        console.log("Error fetching articles:", err.message)
        res.status(500).json({ message: "Error fetching articles", error: err.message })
    }
})

// Update article
authorapp.put('/articles/:id', verifytoken, async (req, res) => {
    try {
        const { articlemodel } = await import('../models/articlemodel.js')
        const { id } = req.params
        const { title, content, category, tags } = req.body
        
        const article = await articlemodel.findByIdAndUpdate(
            id,
            {
                title,
                content,
                category,
                tags: Array.isArray(tags) ? tags : [tags],
                updatedAt: new Date()
            },
            { new: true }
        )
        
        if (!article) {
            return res.status(404).json({ message: "Article not found" })
        }
        
        res.status(200).json({ message: "Article updated successfully", article })
    } catch (err) {
        console.log("Error updating article:", err.message)
        res.status(500).json({ message: "Error updating article", error: err.message })
    }
})

// Delete article
authorapp.delete('/articles/:id', verifytoken, async (req, res) => {
    try {
        const { articlemodel } = await import('../models/articlemodel.js')
        const { id } = req.params
        
        const article = await articlemodel.findByIdAndDelete(id)
        
        if (!article) {
            return res.status(404).json({ message: "Article not found" })
        }
        
        res.status(200).json({ message: "Article deleted successfully" })
    } catch (err) {
        console.log("Error deleting article:", err.message)
        res.status(500).json({ message: "Error deleting article", error: err.message })
    }
})