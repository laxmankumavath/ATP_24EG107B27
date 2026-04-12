import exp from 'express'
import { usermodel } from '../models/usermodel.js' 
import jwt from 'jsonwebtoken'
import { verifytoken } from '../middlewares/verifytoken.js'
import {hash,compare} from 'bcryptjs'
export const userapp=exp.Router()
const {sign} = jwt

