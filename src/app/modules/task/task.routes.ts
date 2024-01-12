import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createTaskZod } from './task.validations'
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  udpateTask,
  updateTasksPosition,
} from './task.controllers'

const router = express.Router()

// example route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    reqValidate(createTaskZod),
    createTask
  )
  .get(getTasks)
  .patch(updateTasksPosition)

router
  .route('/:id')
  .get(getTask)
  .patch(auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), udpateTask)
  .delete(auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteTask)

export default router
