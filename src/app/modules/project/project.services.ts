/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Project, Prisma } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from '../../../errorFormating/apiError'
import { IProjectFilterRequest } from './project.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { projectSearchableFields } from './project.constants'
import { JwtPayload } from 'jsonwebtoken'
import { asyncForEach } from '../../../utilities/asyncForEach'

// create project service
export const createProjectService = async (
  data: Project,
  user: JwtPayload | null
): Promise<Project | null> => {
  const total = await prisma.project.count({})
  data.position = total > 0 ? total : 0
  data.managerId = user?.id
  data.icon = '👍' as string

  const result = await prisma.project.create({
    data,
  })

  return result
}

// get Projects service
export const getProjectsService = async (
  filters: IProjectFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Project[]>> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, onGoing, ...filterData } = filters

  if (onGoing === 'true') {
    // @ts-ignore
    filterData.onGoing = true
  } else if (onGoing === 'false') {
    // @ts-ignore
    filterData.onGoing = false
  }

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: projectSearchableFields.map(field => ({
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

  const whereConditions: Prisma.ProjectWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.project.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            position: 'asc',
          },
    include: {
      manager: true,
    },
  })
  const total = await prisma.project.count({
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

// update Projects position service
export const updateProjectsPositionService = async (
  payload: Project[]
): Promise<Project[] | null> => {
  await asyncForEach(payload, async (project: Project, index: number) => {
    await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        position: index,
      },
    })
  })
  return null
}

// get Project service
export const getProjectService = async (
  id: string
): Promise<Project | null> => {
  const result = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      manager: true,
      sections: {
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          // @ts-ignore
          tasks: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      },
    },
  })

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project not found')
  }

  return result
}

// update project service
export const updateProjectService = async (
  id: string,
  payload: Partial<Project>
): Promise<Project | null> => {
  const isExist = await prisma.project.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project not found')
  }

  const result = await prisma.project.update({
    where: {
      id,
    },
    data: payload,
  })

  return result
}

// delete project service
export const deleteProjectService = async (
  id: string
): Promise<Project | null> => {
  const isExist = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      manager: true,
      sections: {
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          // @ts-ignore
          tasks: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      },
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project not found')
  }

  await prisma.$transaction(async transactionClient => {
    await asyncForEach(isExist?.sections, async (section: Project) => {
      await transactionClient.task.deleteMany({
        where: {
          sectionId: section?.id,
        },
      })
    })

    await transactionClient.section.deleteMany({
      where: {
        projectId: id,
      },
    })

    await transactionClient.project.delete({
      where: {
        id: id,
      },
    })
  })

  return null
}
