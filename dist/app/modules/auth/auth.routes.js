"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const auth_controllers_1 = require("./auth.controllers");
const auth_validations_1 = require("./auth.validations");
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router
    .route('/signup')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, reqValidate_1.default)(auth_validations_1.signUpZod), auth_controllers_1.signUp);
router.route('/activation/:token').patch(auth_controllers_1.accountActivation);
router.route('/signin').post((0, reqValidate_1.default)(auth_validations_1.signInZod), auth_controllers_1.signIn);
router.route('/refresh-token').post((0, reqValidate_1.default)(auth_validations_1.refreshTokenZod), auth_controllers_1.refreshToken);
router
    .route('/change-password')
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, reqValidate_1.default)(auth_validations_1.changePasswordZod), auth_controllers_1.changePassword);
router
    .route('/forget-password')
    .patch((0, reqValidate_1.default)(auth_validations_1.forgetPasswordZod), auth_controllers_1.forgetPassword);
router
    .route('/reset-password/:token')
    .patch((0, reqValidate_1.default)(auth_validations_1.resetPasswordZod), auth_controllers_1.resetPassword);
exports.default = router;
