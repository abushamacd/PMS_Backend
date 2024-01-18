"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSectionZod = void 0;
const zod_1 = require("zod");
// Create section zod validation schema
exports.createSectionZod = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Z: Section title is required',
        }),
        projectId: zod_1.z.string({
            required_error: 'Z: Project id is required',
        }),
    }),
});
