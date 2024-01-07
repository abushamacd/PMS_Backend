/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skill, Prisma } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from '../../../errorFormating/apiError'
import { ISkillFilterRequest } from './skill.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { skillSearchableFields } from './skill.constants'

// create skill service
export const createSkillService = async (
  data: Skill
): Promise<Skill | null> => {
  const result = await prisma.skill.create({
    data,
  })

  return result
}

// get Skills service
export const getSkillsService = async (
  filters: ISkillFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Skill[]>> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: skillSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          // mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.SkillWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.skill.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.skill.count({
    where: whereConditions,
  })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

// get Skill service
export const getSkillService = async (id: string): Promise<Skill | null> => {
  const result = await prisma.skill.findUnique({
    where: {
      id,
    },
  })

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Skill not found')
  }

  return result
}

// update skill service
export const updateSkillService = async (
  id: string,
  payload: Partial<Skill>
): Promise<Skill | null> => {
  const isExist = await prisma.skill.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Skill not found')
  }

  const result = await prisma.skill.update({
    where: {
      id,
    },
    data: payload,
  })

  return result
}

// delete skill service
export const deleteSkillService = async (id: string): Promise<Skill | null> => {
  const isExist = await prisma.skill.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Skill not found')
  }

  const result = await prisma.skill.delete({
    where: {
      id,
    },
  })

  return result
}
