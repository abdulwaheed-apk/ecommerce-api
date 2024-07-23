import { Router } from 'express'
import {
    createExercise,
    getExercises,
    editExercise,
    deleteExercise,
    getExercisesByType,
} from '../controllers/exerciseController.js'
// import verifyToken from '../middlewares/auth.js'

const router = Router()
// router.post('/', verifyToken, createExercise)
// router.get('/', verifyToken, getExercises)
// router.put('/:exerciseId', verifyToken, editExercise)
// router.patch('/:exerciseId', verifyToken, editExercise)
// router.delete('/:exerciseId', verifyToken, deleteExercise)
// router.get('/:type', verifyToken, getExercisesByType)

export default router
