import { z } from 'zod'

// Create section zod validation schema
export const createSectionZod = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Z: Section title is required',
    }),
    projectId: z.string({
      required_error: 'Z: Project id is required',
    }),
  }),
})
