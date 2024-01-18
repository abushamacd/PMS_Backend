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
exports.deleteSectionService = exports.updateSectionService = exports.getSectionService = exports.updateSectionsPositionService = exports.getSectionsService = exports.createSectionService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("../../../errorFormating/apiError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const section_constants_1 = require("./section.constants");
const asyncForEach_1 = require("../../../utilities/asyncForEach");
// create section service
const createSectionService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.section.create({
        data,
    });
    return result;
});
exports.createSectionService = createSectionService;
// get Sections service
const getSectionsService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: section_constants_1.sectionSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.section.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.section.count({
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
exports.getSectionsService = getSectionsService;
// update Sections position service
const updateSectionsPositionService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, asyncForEach_1.asyncForEach)(payload, (section) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.section.update({
            where: {
                id: section.id,
            },
            data: {
                title: 'index',
            },
        });
    }));
    return null;
});
exports.updateSectionsPositionService = updateSectionsPositionService;
// get Section service
const getSectionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.section.findUnique({
        where: {
            id,
        },
        // include: sectionPopulate,
        // include: { manager: true ,Section: true },
    });
    if (!result) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Section not found');
    }
    return result;
});
exports.getSectionService = getSectionService;
// update section service
const updateSectionService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.section.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Section not found');
    }
    const result = yield prisma_1.default.section.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.updateSectionService = updateSectionService;
// delete section service
const deleteSectionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.section.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Section not found');
    }
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.task.deleteMany({
            where: {
                sectionId: id,
            },
        });
        yield transactionClient.section.deleteMany({
            where: {
                id: id,
            },
        });
    }));
    return null;
});
exports.deleteSectionService = deleteSectionService;
