import express from 'express'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import {
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  updateUserProfile,
  updateUserRole,
  uploadPhoto,
} from './user.controllers'
import { FileUploadHelper } from '../../../helpers/FileUploadHelper'

const router = express.Router()

// example route
router.route('/').get(getUsers)

router
  .route('/profile')
  .get(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    getUserProfile
  )
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    updateUserProfile
  )

router
  .route('/changeRole')
  .patch(auth(ENUM_USER_ROLE.SUPER_ADMIN), updateUserRole)

router
  .route('/photo')
  .post(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    FileUploadHelper.upload.single('images'),
    uploadPhoto
  )

router.route('/:email').get(getUser)

router.route('/:id').delete(auth(ENUM_USER_ROLE.SUPER_ADMIN), deleteUser)

export default router
