"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const user_controllers_1 = require("./user.controllers");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const router = express_1.default.Router();
// example route
router.route('/').get(user_controllers_1.getUsers);
router
    .route('/profile')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), user_controllers_1.getUserProfile)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), user_controllers_1.updateUserProfile);
router
    .route('/changeRole')
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), user_controllers_1.updateUserRole);
router
    .route('/photo')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), FileUploadHelper_1.FileUploadHelper.upload.single('images'), user_controllers_1.uploadPhoto);
router.route('/:email').get(user_controllers_1.getUser);
router.route('/:id').delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), user_controllers_1.deleteUser);
exports.default = router;
