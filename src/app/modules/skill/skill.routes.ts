import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createSkillZod } from './skill.validations'
import {
  createSkill,
  deleteSkill,
  getSkill,
  getSkills,
  udpateSkill,
} from './skill.controllers'

const router = express.Router()

// example route
router
  .route('/')
  .post(auth(ENUM_USER_ROLE.ADMIN), reqValidate(createSkillZod), createSkill)
  .get(getSkills)

router
  .route('/:id')
  .get(getSkill)
  .patch(auth(ENUM_USER_ROLE.ADMIN), udpateSkill)
  .delete(auth(ENUM_USER_ROLE.ADMIN), deleteSkill)

export default router
