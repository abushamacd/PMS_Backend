import express from 'express'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { getUser, getUserProfile, updateUserProfile } from './user.controllers'

const router = express.Router()

// example route
router
  .route('/profile')
  .get(auth(ENUM_USER_ROLE.ADMIN), getUserProfile)
  .patch(auth(ENUM_USER_ROLE.ADMIN), updateUserProfile)

router.route('/:email').get(getUser)

export default router
