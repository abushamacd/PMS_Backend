import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createSectionZod } from './section.validations'
import {
  createSection,
  deleteSection,
  getSection,
  getSections,
  udpateSection,
  updateSectionsPosition,
} from './section.controllers'

const router = express.Router()

// example route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    reqValidate(createSectionZod),
    createSection
  )
  .get(getSections)
  .patch(updateSectionsPosition)

router
  .route('/:id')
  .get(getSection)
  .patch(auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), udpateSection)
  .delete(auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteSection)

export default router
