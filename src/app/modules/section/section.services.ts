/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Section, Prisma } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from '../../../errorFormating/apiError'
import { ISectionFilterRequest } from './section.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { sectionSearchableFields } from './section.constants'
import { asyncForEach } from '../../../utilities/asyncForEach'

// create section service
export const createSectionService = async (
  data: Section
): Promise<Section | null> => {
  const result = await prisma.section.create({
    data,
  })

  return result
}

// get Sections service
export const getSectionsService = async (
  filters: ISectionFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Section[]>> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: sectionSearchableFields.map(field => ({
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

  const whereConditions: Prisma.SectionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.section.findMany({
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
  const total = await prisma.section.count({
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

// update Sections position service
export const updateSectionsPositionService = async (
  payload: Section[]
): Promise<Section[] | null> => {
  await asyncForEach(payload, async (section: Section) => {
    await prisma.section.update({
      where: {
        id: section.id,
      },
      data: {
        title: 'index',
      },
    })
    // console.log(index, section)
  })
  return null
}

// get Section service
export const getSectionService = async (
  id: string
): Promise<Section | null> => {
  const result = await prisma.section.findUnique({
    where: {
      id,
    },
    // include: sectionPopulate,
    // include: { manager: true ,Section: true },
  })

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Section not found')
  }

  return result
}

// update section service
export const updateSectionService = async (
  id: string,
  payload: Partial<Section>
): Promise<Section | null> => {
  const isExist = await prisma.section.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Section not found')
  }

  const result = await prisma.section.update({
    where: {
      id,
    },
    data: payload,
  })

  return result
}

// delete section service
export const deleteSectionService = async (
  id: string
): Promise<Section | null> => {
  const isExist = await prisma.section.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Section not found')
  }

  await prisma.$transaction(async transactionClient => {
    await transactionClient.task.deleteMany({
      where: {
        sectionId: id,
      },
    })

    await transactionClient.section.deleteMany({
      where: {
        id: id,
      },
    })
  })

  return null
}
