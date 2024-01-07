import express from 'express'
const router = express.Router()
import authRoute from '../modules/auth/auth.routes'
import userRoute from '../modules/user/user.routes'
import skillRoute from '../modules/skill/skill.routes'

const appRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/skill',
    route: skillRoute,
  },
]

appRoutes.forEach(route => router.use(route.path, route.route))

export default router
