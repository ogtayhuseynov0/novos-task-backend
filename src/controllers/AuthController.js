import express from "express";
import AuthService from "../services/Auth.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
const router = express.Router();

router.post('/login', async function (req, res) {
    if (req.body.email && req.body.password){
        const result = await AuthService.login(req.body.email, req.body.password)
        res.status(result.status).json(result)
    }else {
        res.status(422).json({
            message: 'Email and Password must be present.'
        })
    }
})
router.post('/logout', AuthMiddleware, async function (req, res) {
    const result = await AuthService.logout(req.headers.authorization)
    res.status(result.status).json(result)
})
router.post('/register', async function (req, res) {
    if (req.body.email && req.body.password){
        const result = await AuthService.register(req.body.email, req.body.password)
        res.status(result.status).json(result)
    }else {
        res.status(422).json({
            message: 'Email and Password must be present.'
        })
    }
})

export default router
