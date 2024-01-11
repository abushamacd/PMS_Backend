import express from 'express'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { getUser, getUserProfile, updateUserProfile } from './user.controllers'

const router = express.Router()

// example route
router
  .route('/profile')
  .get(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    getUserProfile
  )
  .patch(auth(ENUM_USER_ROLE.ADMIN), updateUserProfile)

router.route('/:email').get(getUser)

export default router
