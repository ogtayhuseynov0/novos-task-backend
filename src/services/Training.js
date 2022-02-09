import db from '../db/db.js'
import {v4} from "uuid";
const TrainingService = {
    create : async function (training) {
        let userSessions = db.data.sessions.filter(a => a.userID === training.userID)
        db.data.sessions.push({...training, id: v4(), order: userSessions.length+1})
        await db.write()
        return {
            message: 'Session saved!',
            training
        }
    },
    update: async function (sessionId, training)
    {
        db.data.sessions = db.data.sessions.map(a => {
            if (a.id === sessionId && a.userID===training.userID){
                a = {...training}
            }
            return a
        })
        await db.write()
        return training
    },
    get: function (userId) {
        return {
            status: 200,
            data: db.data.sessions.filter(a => a.userID === userId)
        }
    },
    delete: async function (sessionId,userID) {
        db.data.sessions = db.data.sessions.filter(a => a.id !== sessionId )
        await db.write()
        return {
            status: 200,
            message: "Deleted record."
        }
    }
}

export default TrainingService
