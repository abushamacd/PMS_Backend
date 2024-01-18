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
exports.deleteProjectService = exports.updateProjectService = exports.getProjectService = exports.updateProjectsPositionService = exports.getProjectsService = exports.createProjectService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("../../../errorFormating/apiError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const project_constants_1 = require("./project.constants");
const asyncForEach_1 = require("../../../utilities/asyncForEach");
// create project service
const createProjectService = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield prisma_1.default.project.count({});
    data.position = total > 0 ? total : 0;
    data.managerId = user === null || user === void 0 ? void 0 : user.id;
    data.icon = '👍';
    const result = yield prisma_1.default.project.create({
        data,
    });
    return result;
});
exports.createProjectService = createProjectService;
// get Projects service
const getProjectsService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm, onGoing } = filters, filterData = __rest(filters, ["searchTerm", "onGoing"]);
    if (onGoing === 'true') {
        // @ts-ignore
        filterData.onGoing = true;
    }
    else if (onGoing === 'false') {
        // @ts-ignore
        filterData.onGoing = false;
    }
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: project_constants_1.projectSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.project.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                position: 'asc',
            },
        include: {
            manager: true,
        },
    });
    const total = yield prisma_1.default.project.count({
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
exports.getProjectsService = getProjectsService;
// update Projects position service
const updateProjectsPositionService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, asyncForEach_1.asyncForEach)(payload, (project, index) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.project.update({
            where: {
                id: project.id,
            },
            data: {
                position: index,
            },
        });
    }));
    return null;
});
exports.updateProjectsPositionService = updateProjectsPositionService;
// get Project service
const getProjectService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.project.findUnique({
        where: {
            id,
        },
        include: {
            manager: true,
            sections: {
                orderBy: {
                    createdAt: 'asc',
                },
                include: {
                    // @ts-ignore
                    tasks: {
                        orderBy: {
                            position: 'asc',
                        },
                    },
                },
            },
        },
    });
    if (!result) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Project not found');
    }
    return result;
});
exports.getProjectService = getProjectService;
// update project service
const updateProjectService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.project.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Project not found');
    }
    const result = yield prisma_1.default.project.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.updateProjectService = updateProjectService;
// delete project service
const deleteProjectService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.project.findUnique({
        where: {
            id,
        },
        include: {
            manager: true,
            sections: {
                orderBy: {
                    createdAt: 'asc',
                },
                include: {
                    // @ts-ignore
                    tasks: {
                        orderBy: {
                            position: 'asc',
                        },
                    },
                },
            },
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Project not found');
    }
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, asyncForEach_1.asyncForEach)(isExist === null || isExist === void 0 ? void 0 : isExist.sections, (section) => __awaiter(void 0, void 0, void 0, function* () {
            yield transactionClient.task.deleteMany({
                where: {
                    sectionId: section === null || section === void 0 ? void 0 : section.id,
                },
            });
        }));
        yield transactionClient.section.deleteMany({
            where: {
                projectId: id,
            },
        });
        yield transactionClient.project.delete({
            where: {
                id: id,
            },
        });
    }));
    return null;
});
exports.deleteProjectService = deleteProjectService;
