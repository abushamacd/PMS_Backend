import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { User } from '@prisma/client'
import {
  getUserProfileService,
  getUserService,
  updateUserProfileService,
  uploadPhotoService,
} from './user.services'

// get user profile controller
export const getUserProfile = tryCatch(async (req, res) => {
  const result = await getUserProfileService(req.user?.email)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User get successfully',
    data: result,
  })
})

// update user profile controller
export const updateUserProfile = tryCatch(async (req, res) => {
  const result = await updateUserProfileService(req.user?.id, req.body)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User update successfully',
    data: result,
  })
})

// get user
export const getUser = tryCatch(async (req, res) => {
  const result = await getUserService(req.params?.email)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User get successfully',
    data: result,
  })
})

// upload photo
export const uploadPhoto = tryCatch(async (req, res) => {
  const result = await uploadPhotoService(req)
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog image upload successfully',
    data: result,
  })
})
