import prisma from '../../../utilities/prisma'
import { User } from '@prisma/client'
import cloudinary from 'cloudinary'
import { IUploadFile } from '../../../interface/file'
import { Request } from 'express'
import { FileUploadHelper } from '../../../helpers/FileUploadHelper'

// get user profile service
export const getUserProfileService = async (payload: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email: payload,
    },
  })

  return result
}

// update user service
export const updateUserProfileService = async (id: string, payload: User) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  })

  return result
}

// get user profile service
export const getUserService = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return result
}

// user photo upload
export const uploadPhotoService = async (req: Request) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req?.user?.id,
    },
  })

  if (user?.public_id) {
    const { public_id } = user
    await cloudinary.v2.uploader.destroy(public_id)
    const file = req.file as IUploadFile
    const photo = await FileUploadHelper.uploadPhoto(file)

    const data: Partial<User> = {
      public_id: photo?.public_id,
      url: photo?.secure_url,
    }

    const result = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data,
    })

    if (!result) {
      throw new Error(`Photo upload failed`)
    }
  } else {
    const file = req.file as IUploadFile
    const photo = await FileUploadHelper.uploadPhoto(file)

    const data: Partial<User> = {
      public_id: photo?.public_id,
      url: photo?.secure_url,
    }

    const result = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data,
    })

    if (!result) {
      throw new Error(`Photo upload failed`)
    }
  }

  return user
}
