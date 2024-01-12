import express from 'express'
const router = express.Router()
import authRoute from '../modules/auth/auth.routes'
import userRoute from '../modules/user/user.routes'
import projectRoute from '../modules/project/project.routes'
import sectionRoute from '../modules/section/section.routes'
import taskRoute from '../modules/task/task.routes'

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
  {
    path: '/section',
    route: sectionRoute,
  },
  {
    path: '/task',
    route: taskRoute,
  },
]

appRoutes.forEach(route => router.use(route.path, route.route))

export default router
