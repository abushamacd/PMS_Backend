/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task, Prisma } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from '../../../errorFormating/apiError'
import { ITaskFilterRequest } from './task.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { taskPopulate, taskSearchableFields } from './task.constants'
import { JwtPayload } from 'jsonwebtoken'
import { asyncForEach } from '../../../utilities/asyncForEach'

// create task service
export const createTaskService = async (data: Task): Promise<Task | null> => {
  const total = await prisma.task.count({})
  data.position = total > 0 ? total : 0
  const result = await prisma.task.create({
    data,
  })

  return result
}

// get Tasks service
export const getTasksService = async (
  filters: ITaskFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Task[]>> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: taskSearchableFields.map(field => ({
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

  const whereConditions: Prisma.TaskWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.task.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            position: 'asc',
          },
  })
  const total = await prisma.task.count({
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

// update Tasks position service
export const updateTasksPositionService = async (
  payload: any
): Promise<Task[] | null> => {
  const {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId,
  } = payload
  if (resourceSectionId !== destinationSectionId) {
    await asyncForEach(resourceList, async (task: Task, index: number) => {
      await prisma.task.update({
        where: {
          id: resourceList[index].id,
        },
        data: {
          sectionId: resourceSectionId,
          position: index,
        },
      })
    })
  }
  await asyncForEach(destinationList, async (task: Task, index: number) => {
    await prisma.task.update({
      where: {
        id: destinationList[index].id,
      },
      data: {
        sectionId: destinationSectionId,
        position: index,
      },
    })
  })
  return null
}

// get Task service
export const getTaskService = async (id: string): Promise<Task | null> => {
  const result = await prisma.task.findUnique({
    where: {
      id,
    },
    // include: taskPopulate,
    // include: { manager: true ,Task: true },
  })

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Task not found')
  }

  return result
}

// update task service
export const updateTaskService = async (
  id: string,
  payload: Partial<Task>
): Promise<Task | null> => {
  const isExist = await prisma.task.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Task not found')
  }

  const result = await prisma.task.update({
    where: {
      id,
    },
    data: payload,
  })

  return result
}

// delete task service
export const deleteTaskService = async (id: string): Promise<Task | null> => {
  const isExist = await prisma.task.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Task not found')
  }

  const result = await prisma.task.delete({
    where: {
      id,
    },
  })

  return result
}
