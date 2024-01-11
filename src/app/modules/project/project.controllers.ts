import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { Project } from '@prisma/client'
import {
  createProjectService,
  deleteProjectService,
  getProjectService,
  getProjectsService,
  updateProjectService,
  updateProjectsPositionService,
} from './project.services'
import { projectFilterableFields } from './project.constants'
import { pick } from '../../../utilities/pick'
import { paginationFields } from '../../../constants/pagination'

// create project controller
export const createProject = tryCatch(async (req: Request, res: Response) => {
  const result = await createProjectService(req.body, req.user)
  sendRes<Project>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create project successfully',
    data: result,
  })
})

// get Projects
export const getProjects = tryCatch(async (req: Request, res: Response) => {
  const filters = pick(req.query, projectFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await getProjectsService(filters, options)
  sendRes<Project[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

// update Project positon
export const updateProjectsPosition = tryCatch(
  async (req: Request, res: Response) => {
    const result = await updateProjectsPositionService(req.body)
    sendRes<Project[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Position update successfully',
      data: result,
    })
  }
)

// get Projects
export const getProject = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await getProjectService(id)
  sendRes<Project>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project retrived successfully',
    data: result,
  })
})

// update project
export const udpateProject = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await updateProjectService(id, req.body)
  sendRes<Project>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully',
    data: result,
  })
})

// delete project
export const deleteProject = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await deleteProjectService(id)
  sendRes<Project | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project deleted successfully',
    data: result,
  })
})
