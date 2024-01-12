import { z } from 'zod'

// Create task zod validation schema
export const createTaskZod = z.object({
  body: z.object({
    sectionId: z.string({
      required_error: 'Z: Section id is required',
    }),
  }),
})
