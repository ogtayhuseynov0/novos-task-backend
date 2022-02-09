import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const app = express();
import TrainingController from './controllers/TrainingController.js'
import AuthController from './controllers/AuthController.js'
import passport from './middlewares/PassportInit.js'
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
app.use(cors())
import db from "./db/db.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
await db.read()
db.data = db.data || { sessions: [], users: [], tokens: [] }
await db.write()

app.use('/api/training', AuthMiddleware, TrainingController)
app.use('/api', AuthController)

// start the Express server
app.listen( process.env.PORT, () => {
    console.log( `server started at http://localhost:${ process.env.PORT }` );
});
