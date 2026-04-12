import exp from 'express'
import { UserModel } from '../Models/UserModel.js'
import { ArticleModel } from '../Models/ArticleModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'
export const authorApp = exp.Router()


authorApp.post("/publish",verifyToken("AUTHOR"),async(req,res)=>{
    const articleObj = req.body
    let user = req.body
    // console.log(user)
    let author = await UserModel.findById(articleObj.author)
    // console.log(author.email)
    // console.log(user.email)
    if(author.email !== user.email){
     return res.status(403).json({message:"you are not authorized "})
  }
    if (!author)
    
    {
       return res.status(403).json({message:"invalid "})
    }
    if(author.role !== "AUTHOR"){
        return res.status(403).json({message:"invalid role"})
     }
    const newArticle = new ArticleModel (articleObj)
    await newArticle.save()
     res.status(201).json({message:"published"})
})

authorApp.get("/read", verifyToken("AUTHOR"), async (req, res) => {
    const ownarticle = req.articleObj;
    const author = await UserModel.findById(ownarticle.author);
    if (author && author.email !== ownarticle.email) {
        return res.status(403).json({ message: "you are not authorized" });
    }
    
    res.status(200).json({ article: ownarticle });
});



