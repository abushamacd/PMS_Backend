import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createProjectZod } from './project.validations'
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  udpateProject,
  updateProjectsPosition,
} from './project.controllers'

const router = express.Router()

// example route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    reqValidate(createProjectZod),
    createProject
  )
  .get(getProjects)
  .patch(updateProjectsPosition)

router
  .route('/:id')
  .get(getProject)
  .patch(auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), udpateProject)
  .delete(auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteProject)

export default router
