import passport from "passport";
import express from "express";
const router = express.Router();
router.all('*', function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
        // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
        if (err || !user ) {
            // PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
            res.status(401).json({
                message: 'You are not authorized please Sign In.',
                status: 401
            })

        } else {
            req.user = user
            return next();
        }
    })(req, res, next);
});
export default router
