"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectPopulate = exports.projectSearchableFields = exports.projectFilterableFields = void 0;
exports.projectFilterableFields = ['searchTerm', 'onGoing'];
exports.projectSearchableFields = ['title'];
exports.projectPopulate = {
    manager: true,
    sections: true,
};
