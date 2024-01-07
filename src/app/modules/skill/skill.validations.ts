import { z } from 'zod'

// Create skill zod validation schema
export const createSkillZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Z: Skill name is required',
    }),
    percent: z.string({
      required_error: 'Z: Skill percent is required',
    }),
  }),
})
