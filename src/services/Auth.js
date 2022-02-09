import db from "../db/db.js";
import bcrypt from "bcrypt";
import {v4, v4 as uuidv4} from 'uuid'
import jwt from "jsonwebtoken"
import initalFive from "../db/initalFive.js";
import TrainingService from "./Training.js";
const AuthService = {
    login(email, password){
        const user = db.data.users.filter(a=>a.email === email)
        if (user.length===0){
            return {
                status: 401,
                message: 'User with this credentials does not exists'
            }
        }else{
            const equl = bcrypt.compareSync(password, user[0].password)
            if (equl){
                const jwtID = v4()
                db.data.tokens.push(jwtID)
                db.write()
                return  {
                    status: 200,
                    message: "Login Successful",
                    user: {email: user[0].email, id: user[0].id},
                    token: jwt.sign({userID: user[0].id, id: jwtID}, process.env.JWT_SECRET)
                }
            }else{
                return {
                    status: 401,
                    message: 'User with this credentials does not exists'
                }
            }
        }
    },
    async register(email, password){
        if (db.data.users.filter(a => a.email ===email).length>=1){
            return {
                status: 422,
                message: 'User Already exists'
            }
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const uid = uuidv4()
            db.data.users.push({id: uid, email,password: hashedPassword})
            initalFive.map(a => {
                TrainingService.create({...a, userID: uid})
            })
            await db.write();
            return {
                status: 201,
                message: 'User Created successfully'
            }
        }

    },
    async logout(reqToken){
        const token = reqToken.split(' ')[1]
        const r = jwt.decode(token, process.env.JWT_SECRET)
        if (r.id){
            db.data.tokens = db.data.tokens.filter(a => a!==r.id)
            await db.write()
            return {
                status: 401,
                message: "Logout success."
            }
        }else{
            return {
                status: 403,
                message: "Unauthorised"
            }
        }
    }
}
export  default  AuthService
