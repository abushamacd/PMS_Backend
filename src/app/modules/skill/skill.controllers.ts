import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { Skill } from '@prisma/client'
import {
  createSkillService,
  deleteSkillService,
  getSkillService,
  getSkillsService,
  updateSkillService,
} from './skill.services'
import { skillFilterableFields } from './skill.constants'
import { pick } from '../../../utilities/pick'
import { paginationFields } from '../../../constants/pagination'

// create skill controller
export const createSkill = tryCatch(async (req: Request, res: Response) => {
  const result = await createSkillService(req.body)
  sendRes<Skill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create skill successfully',
    data: result,
  })
})

// get Skills
export const getSkills = tryCatch(async (req: Request, res: Response) => {
  const filters = pick(req.query, skillFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await getSkillsService(filters, options)
  sendRes<Skill[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skills retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

// get Skills
export const getSkill = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await getSkillService(id)
  sendRes<Skill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill retrived successfully',
    data: result,
  })
})

// update skill
export const udpateSkill = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await updateSkillService(id, req.body)
  sendRes<Skill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill updated successfully',
    data: result,
  })
})

// delete skill
export const deleteSkill = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await deleteSkillService(id)
  sendRes<Skill | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill deleted successfully',
    data: result,
  })
})
