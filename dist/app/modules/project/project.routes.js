"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const project_validations_1 = require("./project.validations");
const project_controllers_1 = require("./project.controllers");
const router = express_1.default.Router();
// example route
router
    .route('/')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, reqValidate_1.default)(project_validations_1.createProjectZod), project_controllers_1.createProject)
    .get(project_controllers_1.getProjects)
    .patch(project_controllers_1.updateProjectsPosition);
router
    .route('/:id')
    .get(project_controllers_1.getProject)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), project_controllers_1.udpateProject)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), project_controllers_1.deleteProject);
exports.default = router;
