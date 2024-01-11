import express from 'express'
const router = express.Router()
import authRoute from '../modules/auth/auth.routes'
import userRoute from '../modules/user/user.routes'
import projectRoute from '../modules/project/project.routes'

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
    path: '/project',
    route: projectRoute,
  },
]

appRoutes.forEach(route => router.use(route.path, route.route))

export default router
