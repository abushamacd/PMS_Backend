"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const project_routes_1 = __importDefault(require("../modules/project/project.routes"));
const section_routes_1 = __importDefault(require("../modules/section/section.routes"));
const task_routes_1 = __importDefault(require("../modules/task/task.routes"));
const appRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.default,
    },
    {
        path: '/user',
        route: user_routes_1.default,
    },
    {
        path: '/project',
        route: project_routes_1.default,
    },
    {
        path: '/section',
        route: section_routes_1.default,
    },
    {
        path: '/task',
        route: task_routes_1.default,
    },
];
appRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
