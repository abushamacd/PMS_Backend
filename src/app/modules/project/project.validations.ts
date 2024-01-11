import { z } from 'zod'

// Create project zod validation schema
export const createProjectZod = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Z: Project title is required',
    }),
    desc: z.string({
      required_error: 'Z: Description is required',
    }),
  }),
})
