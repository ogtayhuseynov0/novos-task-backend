import express from "express";
import TrainingService from '../services/Training.js'
const router = express.Router();

router.get('/', function (req, res) {
    res.json(TrainingService.get(req.user.id))
})
router.post('/', async function (req, res) {
    res.status(201).json(await TrainingService.create({...req.body, userID: req.user.id}))
})
router.patch('/:id', async function (req, res) {
    res.json(await TrainingService.update(req.params.id,{...req.body, userID: req.user.id}))
})
router.delete('/:id', async function (req, res) {
    res.json(await TrainingService.delete(req.params.id,req.user.id))

})
export default router
