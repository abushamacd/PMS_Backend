"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskService = exports.updateTaskService = exports.getTaskService = exports.updateTasksPositionService = exports.getTasksService = exports.createTaskService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("../../../errorFormating/apiError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const task_constants_1 = require("./task.constants");
const asyncForEach_1 = require("../../../utilities/asyncForEach");
// create task service
const createTaskService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield prisma_1.default.task.count({});
    data.position = total > 0 ? total : 0;
    const result = yield prisma_1.default.task.create({
        data,
    });
    return result;
});
exports.createTaskService = createTaskService;
// get Tasks service
const getTasksService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: task_constants_1.taskSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    // mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.task.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                position: 'asc',
            },
    });
    const total = yield prisma_1.default.task.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
exports.getTasksService = getTasksService;
// update Tasks position service
const updateTasksPositionService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { resourceList, destinationList, resourceSectionId, destinationSectionId, } = payload;
    if (resourceSectionId !== destinationSectionId) {
        yield (0, asyncForEach_1.asyncForEach)(resourceList, (task, index) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma_1.default.task.update({
                where: {
                    id: resourceList[index].id,
                },
                data: {
                    sectionId: resourceSectionId,
                    position: index,
                },
            });
        }));
    }
    yield (0, asyncForEach_1.asyncForEach)(destinationList, (task, index) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.task.update({
            where: {
                id: destinationList[index].id,
            },
            data: {
                sectionId: destinationSectionId,
                position: index,
            },
        });
    }));
    return null;
});
exports.updateTasksPositionService = updateTasksPositionService;
// get Task service
const getTaskService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.task.findUnique({
        where: {
            id,
        },
        // include: taskPopulate,
        // include: { manager: true ,Task: true },
    });
    if (!result) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Task not found');
    }
    return result;
});
exports.getTaskService = getTaskService;
// update task service
const updateTaskService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.task.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Task not found');
    }
    const result = yield prisma_1.default.task.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.updateTaskService = updateTaskService;
// delete task service
const deleteTaskService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.task.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Task not found');
    }
    const result = yield prisma_1.default.task.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteTaskService = deleteTaskService;
