"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const section_validations_1 = require("./section.validations");
const section_controllers_1 = require("./section.controllers");
const router = express_1.default.Router();
// example route
router
    .route('/')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, reqValidate_1.default)(section_validations_1.createSectionZod), section_controllers_1.createSection)
    .get(section_controllers_1.getSections)
    .patch(section_controllers_1.updateSectionsPosition);
router
    .route('/:id')
    .get(section_controllers_1.getSection)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), section_controllers_1.udpateSection)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), section_controllers_1.deleteSection);
exports.default = router;
