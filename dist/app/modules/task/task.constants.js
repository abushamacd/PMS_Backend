"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskPopulate = exports.taskSearchableFields = exports.taskFilterableFields = void 0;
exports.taskFilterableFields = ['searchTerm', 'onGoing'];
exports.taskSearchableFields = ['title'];
exports.taskPopulate = {
    manager: true,
    tasks: true,
};
