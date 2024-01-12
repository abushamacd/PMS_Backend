import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { Task } from '@prisma/client'
import {
  createTaskService,
  deleteTaskService,
  getTaskService,
  getTasksService,
  updateTaskService,
  updateTasksPositionService,
} from './task.services'
import { taskFilterableFields } from './task.constants'
import { pick } from '../../../utilities/pick'
import { paginationFields } from '../../../constants/pagination'

// create task controller
export const createTask = tryCatch(async (req: Request, res: Response) => {
  const result = await createTaskService(req.body)
  sendRes<Task>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create task successfully',
    data: result,
  })
})

// get Tasks
export const getTasks = tryCatch(async (req: Request, res: Response) => {
  const filters = pick(req.query, taskFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await getTasksService(filters, options)
  sendRes<Task[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tasks retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

// update Task positon
export const updateTasksPosition = tryCatch(
  async (req: Request, res: Response) => {
    const result = await updateTasksPositionService(req.body)
    sendRes<Task[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Position update successfully',
      data: result,
    })
  }
)

// get Tasks
export const getTask = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await getTaskService(id)
  sendRes<Task>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task retrived successfully',
    data: result,
  })
})

// update task
export const udpateTask = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await updateTaskService(id, req.body)
  sendRes<Task>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task updated successfully',
    data: result,
  })
})

// delete task
export const deleteTask = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await deleteTaskService(id)
  sendRes<Task | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task deleted successfully',
    data: result,
  })
})
