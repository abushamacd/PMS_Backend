"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const task_validations_1 = require("./task.validations");
const task_controllers_1 = require("./task.controllers");
const router = express_1.default.Router();
// example route
router
    .route('/')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, reqValidate_1.default)(task_validations_1.createTaskZod), task_controllers_1.createTask)
    .get(task_controllers_1.getTasks)
    .patch(task_controllers_1.updateTasksPosition);
router
    .route('/:id')
    .get(task_controllers_1.getTask)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), task_controllers_1.udpateTask)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), task_controllers_1.deleteTask);
exports.default = router;
