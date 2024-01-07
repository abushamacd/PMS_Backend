import prisma from '../../../utilities/prisma'
import { User } from '@prisma/client'

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
export const updateUserProfileService = async (
  id: string,
  payload: Partial<User>
) => {
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
