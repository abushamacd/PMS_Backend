import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { Section } from '@prisma/client'
import {
  createSectionService,
  deleteSectionService,
  getSectionService,
  getSectionsService,
  updateSectionService,
  updateSectionsPositionService,
} from './section.services'
import { sectionFilterableFields } from './section.constants'
import { pick } from '../../../utilities/pick'
import { paginationFields } from '../../../constants/pagination'

// create section controller
export const createSection = tryCatch(async (req: Request, res: Response) => {
  const result = await createSectionService(req.body)
  sendRes<Section>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create section successfully',
    data: result,
  })
})

// get Sections
export const getSections = tryCatch(async (req: Request, res: Response) => {
  const filters = pick(req.query, sectionFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await getSectionsService(filters, options)
  sendRes<Section[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sections retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

// update Section positon
export const updateSectionsPosition = tryCatch(
  async (req: Request, res: Response) => {
    const result = await updateSectionsPositionService(req.body)
    sendRes<Section[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Position update successfully',
      data: result,
    })
  }
)

// get Sections
export const getSection = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await getSectionService(id)
  sendRes<Section>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Section retrived successfully',
    data: result,
  })
})

// update section
export const udpateSection = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await updateSectionService(id, req.body)
  sendRes<Section>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Section updated successfully',
    data: result,
  })
})

// delete section
export const deleteSection = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await deleteSectionService(id)
  sendRes<Section | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Section deleted successfully',
    data: result,
  })
})
