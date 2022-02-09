import passport from "passport";
import passportJWT from 'passport-jwt'
import db from "../db/db.js";
const extractJWT = passportJWT.ExtractJwt
const StrategyJWT = passportJWT.Strategy
passport.use(
    new StrategyJWT(
        {
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function (jwtPayload, done) {
            const isExists = db.data.tokens.filter(a => jwtPayload.id)
            if (isExists.length > 0) {
                done(null, db.data.users.filter(a => a.id === jwtPayload.userID)[0])
            } else {
                done("Token not found.")
            }
        }
    )
)
export default passport

